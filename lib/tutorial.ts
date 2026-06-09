import { getYoutubeEmbedUrl, getYoutubeThumbnail } from "./youtube";

export type TutorialCategory = "gym" | "boxing" | "fitness";

export type Tutorial = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: TutorialCategory;
  categoryLabel: string;
  youtubeUrl: string;
  embedUrl: string;
  thumbnail: string;
  duration: string;
  views: string;
  date: string;
  lessonOrder: number;
  lessonNumber: number;
  lessonLabel: string;
  featured: boolean;
};

const CATEGORY_LABELS: Record<TutorialCategory, string> = {
  gym: "Gym Training",
  boxing: "Boxing Training",
  fitness: "Fitness Training",
};

export type SanityTutorial = {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  category: TutorialCategory;
  youtubeUrl: string;
  thumbnail?: { asset?: { url?: string } };
  duration?: string;
  views?: string;
  publishedAt?: string;
  lessonOrder?: number;
  featured?: boolean;
};

export function getCategoryLabel(category: TutorialCategory): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function mapSanityTutorial(
  raw: SanityTutorial,
  lessonNumber?: number
): Tutorial {
  const order = raw.lessonOrder ?? lessonNumber ?? 1;
  const num = lessonNumber ?? order;

  return {
    id: raw._id,
    slug: raw.slug ?? raw._id,
    title: raw.title,
    description: raw.description ?? "",
    category: raw.category,
    categoryLabel: getCategoryLabel(raw.category),
    youtubeUrl: raw.youtubeUrl,
    embedUrl: getYoutubeEmbedUrl(raw.youtubeUrl),
    thumbnail: raw.thumbnail?.asset?.url ?? getYoutubeThumbnail(raw.youtubeUrl),
    duration: raw.duration ?? "—",
    views: raw.views ?? "0",
    date: raw.publishedAt
      ? new Date(raw.publishedAt).toLocaleDateString()
      : new Date().toLocaleDateString(),
    lessonOrder: order,
    lessonNumber: num,
    lessonLabel: `Lesson ${num}`,
    featured: raw.featured ?? false,
  };
}

export function mapSanityTutorials(rawList: SanityTutorial[]): Tutorial[] {
  const sorted = [...rawList].sort(
    (a, b) => (a.lessonOrder ?? 999) - (b.lessonOrder ?? 999)
  );
  return sorted.map((raw, index) => mapSanityTutorial(raw, index + 1));
}
