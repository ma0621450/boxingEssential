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
    title: "Gym Training School",
    description:
      "Build boxing strength, explosive power, and full-body conditioning with fighter-focused weights, core circuits, and gym drills.",
  },
  boxing: {
    title: "Boxing Training School",
    description:
      "Master ring strategy, footwork, punch combinations, and defense with step-by-step boxing training videos and guides.",
  },
  fitness: {
    title: "Fitness Training School",
    description:
      "Peak boxing fitness with HIIT cardio intervals, fat-burn shadowboxing circuits, and endurance workouts for fighters.",
  },
} as const;

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  if (!TRAINING_CATEGORIES.includes(category as TutorialCategory)) return {};

  const details = categorySeo[category as TutorialCategory];
  const url = `https://boxingessential.com/training/${category}`;
  return {
    title: details.title,
    description: details.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${details.title} | Boxing Essential`,
      description: details.description,
      type: "website",
      url,
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
