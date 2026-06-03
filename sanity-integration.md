# Sanity CMS & Next.js Integration Guide

This guide contains the exact schemas, client configurations, GROQ queries, custom Portable Text renderers, and Next.js App Router integrations used in this project. You can copy this file or feed it to any AI assistant to instantly replicate this robust, premium content architecture in another codebase.

---

## 🛠️ 1. Technical Stack & Dependencies

To establish this integration, run the following command in the target Next.js application:

```bash
npm install next-sanity @sanity/image-url @portabletext/react lucide-react
```

- **`next-sanity`**: Official Sanity client optimized for Next.js (includes GROQ utility).
- **`@sanity/image-url`**: Generates responsive, high-performance image URLs from Sanity asset metadata.
- **`@portabletext/react`**: Renders rich-text blocks into customizable React elements.
- **`lucide-react`**: UI icons matching the navigation and buttons.

---

## 🔑 2. Environment Variables (`.env.local`)

Ensure these values are configured in the target project's environment. The client will automatically fall back to the project ID `'m9z3o7gu'` if undefined:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="m9z3o7gu"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

# Required on server side only if performing draft previews or mutations:
SANITY_API_TOKEN="your_secure_server_token_here"
```

---

## ⚙️ 3. Sanity Studio Configuration

### 📄 `sanity.config.js`
Place this in the root of the project to initialize the Sanity Studio interface under the `/admin` path:

```javascript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './sanity/schema';

export default defineConfig({
  basePath: '/admin', // Maps studio dashboard to yourdomain.com/admin
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'm9z3o7gu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  
  schema,
  plugins: [structureTool()],
});
```

### 📄 `sanity/schema.js`
Aggregates all schema definitions into a single schema object:

```javascript
import post from './schemas/post.js';
import author from './schemas/author.js';
import HTMLEmbed from './schemas/HTMLEmbed.js';

export const schema = {
  types: [post, author, HTMLEmbed],
};
```

---

## 📑 4. Schema Definitions (`sanity/schemas/*`)

### 📄 `sanity/schemas/post.js` (Blog Post Schema)
This schema supports rich title slugging, relations (Authors), SEO control, categorical grouping, and custom structured FAQs:

```javascript
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'WEB DEVELOPMENT' },
          { title: 'App Development', value: 'APP DEVELOPMENT' },
          { title: 'Software Development', value: 'SOFTWARE DEVELOPMENT' },
          { title: 'Digital Marketing', value: 'DIGITAL MARKETING' },
          { title: 'Graphic Designing', value: 'GRAPHIC DESIGNING' },
          { title: 'Artificial Intelligence', value: 'ARTIFICIAL INTELLIGENCE' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }, { type: 'htmlEmbed' }],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO & Social',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Optimized for search engines (max 60 chars).',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Summarize the post for search results (max 155 chars).',
          validation: (Rule) => Rule.max(155),
        },
        {
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string',
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image displayed when shared on social media.',
        },
      ],
    },
  ],
};
```

### 📄 `sanity/schemas/author.js` (Author Details)
Defines post authors, their profile pictures, and quick bios:

```javascript
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    },
  ],
};
```
```

### 📄 `sanity/schemas/HTMLEmbed.js` (HTML Embed)
Allows embedding custom HTML (e.g. iframes, tables) within block content:

```javascript
export default {
    name: 'htmlEmbed',
    title: 'HTML Embed',
    type: 'object',

    fields: [
        {
            name: 'code',
            title: 'HTML Code',
            type: 'text',
            description: 'Paste HTML table or embed code here',
        },
    ],
}
```

---

## 🛰️ 5. Sanity API Clients (`lib/sanity.js`)

Provides both a secure read-only client for public frontend routes, and an authorized client for draft updates/mutations:

```javascript
import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

// 1. Client for public data retrieval
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production', // true in production for edge speed
});

// 2. Server-side client with Write/Preview tokens
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// 3. Image builder initialization
const builder = createImageUrlBuilder(client);

// 4. Utility function to safely output high-performance image URLs
export function urlFor(source) {
  return builder.image(source);
}
```

---

## 🔍 6. Data Queries (`lib/queries.js`)

Uses GROQ (Graph Relation Object Query) for granular, lightweight data retrieval:

```javascript
import { groq } from 'next-sanity';

// Fetches posts matching a specific category with pagination constraints ($start and $end)
export const getPaginatedPosts = groq`
  *[_type == "post" && (
    $category == "ALL" || 
    lower(category) == lower($category) || 
    lower(filter) == lower($category)
  )] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      ...,
      "originalFilename": asset->originalFilename
    },
    category,
    filter,
    ref
  }
`;

// Helper count queries for exact pagination mapping
export const getPostsCount = groq`
  count(*[_type == "post" && (
    $category == "ALL" || 
    lower(category) == lower($category) || 
    lower(filter) == lower($category)
  )])
`;

// Gets all slugs for next.js generateStaticParams
export const getAllPosts = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      ...,
      "originalFilename": asset->originalFilename
    },
    category,
    ref
  }
`;

// Detailed single post lookup with full reference joins (Author structure, content blocks, FAQs, SEO)
export const getPostBySlug = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      ...,
      "originalFilename": asset->originalFilename
    },
    category,
    tags,
    ref,
    content[] {
      ...,
      _type == "image" => {
        ...,
        "originalFilename": asset->originalFilename
      }
    },
    faqs,
    seo,
    author-> {
      name,
      image {
        ...,
        "originalFilename": asset->originalFilename
      },
      bio
    }
    }
  }
`;

```

---

## 🎨 7. Portable Text Custom Renderer (`components/PortableText.jsx`)

Maps default block formats (H2, H3, paragraphs, lists) and custom types (Images) to sleek, semantic HTML. It also auto-generates target IDs on headings to support seamless anchor scrolls:

```javascript
import { PortableText as BasePortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

const components = {
  block: {
    // Generates an anchor ID from header text (e.g. "Shader Optimization" -> "shader-optimization")
    h2: ({ children, value }) => {
      const text = value?.children?.map(child => child.text).join('') || '';
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return (
        <h2 id={id} className="text-white text-3xl mt-16 mb-8 scroll-mt-32">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text = value?.children?.map(child => child.text).join('') || '';
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return (
        <h3 id={id} className="text-white text-2xl mt-12 mb-6 scroll-mt-32">
          {children}
        </h3>
      );
    },
    normal: ({ children }) => (
      <p className="text-zinc-300 text-lg leading-relaxed mb-8">
        {children}
      </p>
    ),
  },
  types: {
    // Custom handling for body-embedded images, outputting optimized Next.js NextImages
    image: ({ value }) => (
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
    ), htmlEmbed: ({ value }) => {
      return (
        <div
          className="my-10 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: value.code }}
        />
      )
    },
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline transition-all">
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-10 space-y-4 mb-8 marker:text-primary">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-10 space-y-4 mb-8 marker:text-primary">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-zinc-300 text-lg leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-zinc-300 text-lg leading-relaxed">{children}</li>,
  },
};

export default function PortableText({ value }) {
  if (!value) return null;
  return <BasePortableText value={value} components={components} />;
}
```

---

## 🌐 8. Next.js App Router Page Implementations

### 📄 `app/blogs/page.js` (Blogs Archive & Pagination)
Uses asynchronous parallel queries to load posts list and posts counts simultaneously:

```javascript
import PageHero from "@/components/sections/PageHero";
import BlogGrid from "@/components/sections/Blogs/BlogGrid";
import { client } from "@/lib/sanity";
import { getPaginatedPosts, getPostsCount } from "@/lib/queries";

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Digital Business Blogs |Mahraj Technologies",
    description: "We share insights and updates on our digital business blog, covering trends, strategies, and ideas to help businesses grow with modern digital solutions.",
    alternates: {
      canonical: "https://mahrajtechnologies.com/blogs",
    },
    publisher: "Mahraj Technologies"
  };
}

export default async function BlogsPage({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page) || 1;
  const activeFilter = params?.filter || "ALL";
  const limit = 5;
  const start = (currentPage - 1) * limit;
  const end = start + limit;

  // Fetch posts and total count in parallel
  const [posts, totalCount] = await Promise.all([
    client.fetch(getPaginatedPosts, {
      category: activeFilter,
      start,
      end
    }),
    client.fetch(getPostsCount, {
      category: activeFilter
    })
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <main className="min-h-screen bg-black">
      <PageHero
        eyebrow="HOME / BLOGS"
        titleLight="Our"
        titleDark="Knowledge HUB"
        description="Explore our expert insights, digital strategies, and industry trends to help grow your business online."
      />
      <BlogGrid
        posts={posts}
        totalPages={totalPages}
        currentPage={currentPage}
        activeFilter={activeFilter}
      />
    </main>
  );
}
```

### 📄 `app/blogs/[slug]/page.js` (Single Article with Dynamic Metadata, FAQs, and JSON-LD)
Implements dynamic metadata generation, pre-generation of all static routes (`generateStaticParams`), reading time helper, technical SEO schema injection, and a structured FAQ section:

```javascript
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Hash } from "lucide-react";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import { getPostBySlug, getAllPosts } from "@/lib/queries";
import PortableText from "@/components/PortableText";
import RecentPostsSidebar from "@/components/sections/Blogs/RecentPostsSidebar";

export const revalidate = 60;

// Helper: Calculate Reading Time (WPM-based)
function calculateReadingTime(content) {
  if (!content) return 0;
  const wordsPerMinute = 200;
  const text = content
    .filter((block) => block._type === 'block')
    .map((block) => block.children.map((child) => child.text).join(''))
    .join(' ');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// 1. Dynamic SEO Metadata Generator
export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return { title: "Insights | Mahraj Technologies" };

  const post = await client.fetch(getPostBySlug, { slug });
  if (!post) return { title: "Article Not Found" };

  const canonical = `https://mahrajtechnologies.com/blogs/${post.slug}`;

  return {
    title: post.seo?.metaTitle || `${post.title} | Mahraj Technologies`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.focusKeyword,
    alternates: {
      canonical: canonical,
    },
    publisher: "Mahraj Technologies",
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      url: canonical,
      images: post.seo?.ogImage ? [urlFor(post.seo.ogImage).url()] : (post.mainImage ? [urlFor(post.mainImage).url()] : []),
      type: 'article',
    },
  };
}

// 2. Pre-generate all static pages (SSG) for fast edge load
export async function generateStaticParams() {
  const posts = await client.fetch(getAllPosts);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 3. Blog Detail Page Renderer
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  if (!slug) notFound();

  const post = await client.fetch(getPostBySlug, { slug });
  if (!post) notFound();

  const readingTime = calculateReadingTime(post.content);

  // Fetch all posts for sidebar logic
  const allPosts = await client.fetch(getAllPosts);
  const recentPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 5);

  // Structured Schema: JSON-LD Article Markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.mainImage ? urlFor(post.mainImage).url() : undefined,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Mahraj Expert"
    }
  };

  // Structured Schema: JSON-LD FAQs Markup
  const faqJsonLd = post.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 text-white">
      {/* Injecting SEO Schemas dynamically */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Back Link */}
        <Link href="/blogs" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>

        {/* Categories, Dates & Time info */}
        <div className="flex gap-4 items-center text-sm text-zinc-400 mb-4">
          <span className="bg-zinc-800 px-3 py-1 text-xs uppercase font-bold text-white">{post.category}</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.publishedAt).toLocaleDateString()}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{readingTime} min read</span>
        </div>

        <h1 className="text-5xl font-black uppercase mb-8 leading-tight">{post.title}</h1>
        <p className="text-zinc-400 text-xl mb-12">{post.excerpt}</p>

        {/* Cover Image */}
        {post.mainImage ? (
          <div className="relative aspect-[16/9] w-full mb-16 overflow-hidden rounded border border-zinc-800">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-zinc-900 flex items-center justify-center mb-16">
            <Hash className="w-16 h-16 text-zinc-700" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main article Content and FAQs */}
          <div className="lg:col-span-9">
            <article className="prose prose-invert max-w-none">
              <PortableText value={post.content} />
            </article>

            {/* Author box */}
            {post.author && (
              <div className="mt-16 p-8 bg-zinc-900 rounded border border-zinc-800 flex gap-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  {post.author.image ? (
                    <Image src={urlFor(post.author.image).url()} alt={post.author.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center"><User className="w-8 h-8 text-zinc-500" /></div>
                  )}
                </div>
                <div>
                  <span className="text-xs uppercase text-zinc-500 font-bold">Author</span>
                  <h4 className="text-lg font-bold text-white mb-2">{post.author.name}</h4>
                  <p className="text-sm text-zinc-400">{post.author.bio}</p>
                </div>
              </div>
            )}

            {/* Render FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-20 border-t border-zinc-800 pt-16">
                <h3 className="text-2xl font-bold uppercase mb-8">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {post.faqs.map((faq, i) => (
                    <div key={i} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded">
                      <h4 className="font-bold text-white mb-2">Q: {faq.question}</h4>
                      <p className="text-sm text-zinc-400 pl-4">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <RecentPostsSidebar recentPosts={recentPosts} />
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## 🛡️ 9. Studio CSS Isolation (Tailwind Conflict Fix)

When embedding Sanity Studio inside a Next.js App Router project that uses Tailwind CSS, Tailwind's global preflight resets will strip styling from the Studio (e.g., ordered lists will break and render as `1. 1. 1.`). 

To permanently fix this, the project uses **Next.js Route Groups** to isolate the Studio from the global CSS:

1. **Frontend Route Group**: All public pages and the main `layout.js` (which imports `globals.css`) are placed inside an `app/(frontend)` directory.
2. **Admin Route**: The Sanity Studio is kept in `app/admin/[[...index]]/page.jsx`.
3. **Clean Admin Layout**: A dedicated `app/admin/layout.jsx` is used that does **not** import the global CSS:

```javascript
export const metadata = {
  title: 'Sanity Studio',
  description: 'Sanity Studio Admin Dashboard',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
```
This ensures the Sanity Studio retains its native styling and functionality without interference from Tailwind CSS.

---

## 🤖 AI prompt template to replicate:
```text
Role: Principal Frontend Architect & Next.js/Sanity Developer.
Task: Integrate Sanity CMS inside the current Next.js workspace.
Instructions:
1. Refer to the standard schema definitions (post, author), client configuration, GROQ queries, PortableText component, and Page/Slug routes listed in the 'Sanity CMS & Next.js Integration Guide'.
2. Create standard folder setups: `sanity/schemas`, `lib`, and `components`.
3. Set up the schema models and queries using the exact field structures, metadata generations, image rendering, and block-level PortableText specifications.
4. Ensure all files use modular imports and modern React/Next.js dynamic routing paradigms.
```
