import PortableText from "@/components/PortableText";
import { AdBanner } from "@/components/ad-banner";
import {
  splitHtmlAtKeyTakeaways,
  splitPortableTextAtKeyTakeaways,
} from "@/lib/split-at-key-takeaways";

interface ArticleContentProps {
  processedHtml: string | null;
  content: unknown;
}

export function ArticleContent({ processedHtml, content }: ArticleContentProps) {
  if (processedHtml) {
    const { before, after } = splitHtmlAtKeyTakeaways(processedHtml);

    if (after) {
      return (
        <>
          {before ? <div dangerouslySetInnerHTML={{ __html: before }} /> : null}
          <AdBanner />
          <div dangerouslySetInnerHTML={{ __html: after }} />
        </>
      );
    }

    return <div dangerouslySetInnerHTML={{ __html: processedHtml }} />;
  }

  if (Array.isArray(content) && content.length > 0) {
    const { before, after } = splitPortableTextAtKeyTakeaways(content);

    if (after) {
      return (
        <>
          {before.length > 0 ? <PortableText value={before} /> : null}
          <AdBanner />
          <PortableText value={after} />
        </>
      );
    }

    return <PortableText value={content} />;
  }

  return null;
}
