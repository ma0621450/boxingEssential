export type TOCItem = {
    id: string;
    text: string;
    level: number;
};

export function extractTOC(rawHtml: string): TOCItem[] {
    if (!rawHtml) return [];

    const items: TOCItem[] = [];
    const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
    let match;
    const seenIds = new Map<string, number>();

    while ((match = regex.exec(rawHtml)) !== null) {
        const level = parseInt(match[1]);
        // Strip any inner HTML tags from heading text
        const text = match[2].replace(/<[^>]+>/g, "").trim();
        if (!text) continue;

        let id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .slice(0, 60);

        if (seenIds.has(id)) {
            const count = seenIds.get(id)! + 1;
            seenIds.set(id, count);
            id = `${id}-${count}`;
        } else {
            seenIds.set(id, 0);
        }

        items.push({ id, text, level });
    }

    return items;
}

// Injects id attributes into h2/h3 tags in rawHtml
// so TOC anchor links actually work
export function injectHeadingIds(rawHtml: string): string {
    if (!rawHtml) return "";

    const seenIds = new Map<string, number>();

    return rawHtml.replace(
        /<h([23])([^>]*)>(.*?)<\/h[23]>/gi,
        (match, level, attrs, content) => {
            // Skip if already has an id
            if (attrs.includes('id=')) return match;

            const text = content.replace(/<[^>]+>/g, "").trim();
            let id = text
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .slice(0, 60);

            if (seenIds.has(id)) {
                const count = seenIds.get(id)! + 1;
                seenIds.set(id, count);
                id = `${id}-${count}`;
            } else {
                seenIds.set(id, 0);
            }

            return `<h${level} id="${id}"${attrs}>${content}</h${level}>`;
        }
    );
}