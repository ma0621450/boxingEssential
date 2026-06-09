const KEY_TAKEAWAYS_REGEX = /key\s*takeaways/i;

export function splitHtmlAtKeyTakeaways(html: string): {
  before: string;
  after: string | null;
} {
  const headingRegex = /<h([234])[^>]*>[\s\S]*?<\/h\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(html)) !== null) {
    const headingText = match[0].replace(/<[^>]+>/g, "");
    if (KEY_TAKEAWAYS_REGEX.test(headingText) && match.index !== undefined) {
      return {
        before: html.slice(0, match.index),
        after: html.slice(match.index),
      };
    }
  }

  return { before: html, after: null };
}

export function splitPortableTextAtKeyTakeaways(content: unknown[]): {
  before: unknown[];
  after: unknown[] | null;
} {
  if (!content?.length) {
    return { before: [], after: null };
  }

  const index = content.findIndex((block) => {
    if (!block || typeof block !== "object") return false;
    const typedBlock = block as {
      _type?: string;
      style?: string;
      children?: { text?: string }[];
    };
    if (typedBlock._type !== "block") return false;

    const text =
      typedBlock.children?.map((child) => child.text ?? "").join("") ?? "";
    return (
      KEY_TAKEAWAYS_REGEX.test(text) &&
      ["h2", "h3", "h4"].includes(typedBlock.style ?? "")
    );
  });

  if (index === -1) {
    return { before: content, after: null };
  }

  return {
    before: content.slice(0, index),
    after: content.slice(index),
  };
}
