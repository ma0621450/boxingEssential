import { notFound } from "next/navigation";
import { TrainingCategoryClient } from "@/components/training-category-client";
import { getBlogsByTrainingCategory } from "@/lib/queries";
import { serverClient } from "@/lib/sanity";
import { withYoutubeDurationList } from "@/lib/enrich-tutorial";
import { getTutorialsByCategory } from "@/lib/tutorial-queries";
import {
  getCategoryLabel,
  mapSanityTutorials,
  type SanityTutorial,
  type TutorialCategory,
} from "@/lib/tutorial";

export const revalidate = 3600;

const TRAINING_CATEGORIES: TutorialCategory[] = ["gym", "boxing", "fitness"];

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return TRAINING_CATEGORIES.map((category) => ({ category }));
}

const categorySeo = {
  gym: {
    title: "Gym Training School | Boxing Essential",
    description:
      "Build foundational boxing strength, explosive muscle power, and full-body conditioning with fighter weights and core circuits.",
  },
  boxing: {
    title: "Boxing Training School | Boxing Essential",
    description:
      "Master ring strategy, rapid footwork mechanics, snappy punch combinations, and pocket defense from elite trainers.",
  },
  fitness: {
    title: "Fitness Training School | Boxing Essential",
    description:
      "Get in peak boxer shape with high-intensity cardio boxing intervals, fat-burn shadowboxing circuits, and endurance exercises.",
  },
} as const;

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  if (!TRAINING_CATEGORIES.includes(category as TutorialCategory)) return {};

  const details = categorySeo[category as TutorialCategory];
  return {
    title: details.title,
    description: details.description,
    openGraph: {
      title: details.title,
      description: details.description,
      type: "website",
      url: `https://boxingessential.com/training/${category}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;

  if (!TRAINING_CATEGORIES.includes(category as TutorialCategory)) {
    notFound();
  }

  const typedCategory = category as TutorialCategory;

  const [relatedBlogs, categoryVideos] = await Promise.all([
    serverClient.fetch(getBlogsByTrainingCategory, {
      category: getCategoryLabel(typedCategory),
    }),
    withYoutubeDurationList(
      await serverClient.fetch<SanityTutorial[]>(getTutorialsByCategory, {
        category: typedCategory,
      })
    ).then(mapSanityTutorials),
  ]);

  return (
    <TrainingCategoryClient
      category={typedCategory}
      categoryVideos={categoryVideos}
      relatedBlogs={relatedBlogs}
    />
  );
}
