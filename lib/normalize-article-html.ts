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

  // Migrated WP content often links to /slug/ — strip trailing slash so
  // crawlers aren't continually pointed at the duplicate URL variant.
  result = result.replace(
    /(https?:\/\/(?:www\.)?boxingessential\.com[^"'>\s]*)\/(?=["'#?\s>])/gi,
    "$1"
  );
  result = result.replace(/(href=["'])(\/[^"'>\s]+)\/(["'])/gi, "$1$2$3");

  return result.trim();
}

export function hasHtmlBlockStructure(html: string): boolean {
  return /<(?:p|h[1-6]|ul|ol|li|table|blockquote|div)\b/i.test(html);
}
