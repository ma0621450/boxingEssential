import { PortableText as BasePortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

const components = {
  block: {
    h2: ({ children, value }: any) => {
      const text = value?.children?.map((child: any) => child.text).join('') || '';
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return (
        <h2 id={id} className="text-white text-3xl mt-16 mb-8 scroll-mt-32">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }: any) => {
      const text = value?.children?.map((child: any) => child.text).join('') || '';
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return (
        <h3 id={id} className="text-white text-2xl mt-12 mb-6 scroll-mt-32">
          {children}
        </h3>
      );
    },
    normal: ({ children }: any) => (
      <p className="text-zinc-300 text-lg leading-relaxed mb-8">
        {children}
      </p>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="relative aspect-video w-full my-12 overflow-hidden rounded-sm border border-white/10">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || 'Content Image'}
          title={value.originalFilename || value.alt || 'Content Image'}
          fill
          className="object-cover opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
        />
      </div>
    ), 
    htmlEmbed: ({ value }: any) => {
      return (
        <div
          className="my-10 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: value.code }}
        />
      )
    },
  },
  marks: {
    strong: ({ children }: any) => <strong className="text-white font-bold">{children}</strong>,
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-red-500 hover:underline transition-all">
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-10 space-y-4 mb-8 marker:text-red-500">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-10 space-y-4 mb-8 marker:text-red-500">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-zinc-300 text-lg leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="text-zinc-300 text-lg leading-relaxed">{children}</li>,
  },
};

export default function PortableText({ value }: { value: any }) {
  if (!value) return null;
  return <BasePortableText value={value} components={components} />;
}
