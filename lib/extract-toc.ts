export type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export function nextUniqueHeadingId(
  text: string,
  seenIds: Map<string, number>
): string {
  let id = slugifyHeading(text);
  if (!id) return "";

  if (seenIds.has(id)) {
    const count = seenIds.get(id)! + 1;
    seenIds.set(id, count);
    id = `${id}-${count}`;
  } else {
    seenIds.set(id, 0);
  }

  return id;
}

function blockText(block: {
  children?: { text?: string }[];
}): string {
  return block.children?.map((child) => child.text ?? "").join("") ?? "";
}

export function extractTOC(rawHtml: string): TOCItem[] {
  if (!rawHtml) return [];

  const items: TOCItem[] = [];
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  let match;
  const seenIds = new Map<string, number>();

  while ((match = regex.exec(rawHtml)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    if (!text) continue;

    const id = nextUniqueHeadingId(text, seenIds);
    if (!id) continue;

    items.push({ id, text, level });
  }

  return items;
}

export function extractTOCFromPortableText(content: unknown): TOCItem[] {
  if (!Array.isArray(content) || content.length === 0) return [];

  const items: TOCItem[] = [];
  const seenIds = new Map<string, number>();

  for (const block of content) {
    if (!block || typeof block !== "object") continue;
    const typed = block as {
      _type?: string;
      style?: string;
      children?: { text?: string }[];
      headingId?: string;
    };

    if (typed._type !== "block") continue;
    if (typed.style !== "h2" && typed.style !== "h3") continue;

    const text = blockText(typed).trim();
    if (!text) continue;

    const id = typed.headingId || nextUniqueHeadingId(text, seenIds);
    if (!id) continue;

    items.push({
      id,
      text,
      level: typed.style === "h2" ? 2 : 3,
    });
  }

  return items;
}

/** Attach stable headingId fields so TOC anchors match rendered headings. */
export function assignPortableTextHeadingIds<T>(content: T): T {
  if (!Array.isArray(content)) return content;

  const seenIds = new Map<string, number>();

  return content.map((block) => {
    if (!block || typeof block !== "object") return block;
    const typed = block as {
      _type?: string;
      style?: string;
      children?: { text?: string }[];
    };

    if (typed._type !== "block") return block;
    if (typed.style !== "h2" && typed.style !== "h3") return block;

    const text = blockText(typed).trim();
    if (!text) return block;

    const headingId = nextUniqueHeadingId(text, seenIds);
    return { ...block, headingId };
  }) as T;
}

/** Injects id attributes into h2/h3 tags in rawHtml so TOC anchors work. */
export function injectHeadingIds(rawHtml: string): string {
  if (!rawHtml) return "";

  const seenIds = new Map<string, number>();

  return rawHtml.replace(
    /<h([23])([^>]*)>(.*?)<\/h[23]>/gi,
    (match, level, attrs, content) => {
      if (/\sid\s*=/.test(attrs)) return match;

      const text = content.replace(/<[^>]+>/g, "").trim();
      const id = nextUniqueHeadingId(text, seenIds);
      if (!id) return match;

      return `<h${level} id="${id}"${attrs}>${content}</h${level}>`;
    }
  );
}
