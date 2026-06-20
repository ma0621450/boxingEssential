/** Strip common WordPress plugin markup before rendering migrated HTML. */
export function normalizeArticleHtml(html: string): string {
  if (!html) return "";

  let result = html;

  result = result.replace(
    /<div[^>]*id="ez-toc-container"[\s\S]*?<\/div>\s*<\/div>/gi,
    ""
  );
  result = result.replace(/<script[\s\S]*?<\/script>/gi, "");
  result = result.replace(/\sstyle="[^"]*"/gi, "");
  result = result.replace(/<\/?span[^>]*>/gi, "");

  return result.trim();
}

export function hasHtmlBlockStructure(html: string): boolean {
  return /<(?:p|h[1-6]|ul|ol|li|table|blockquote|div)\b/i.test(html);
}
