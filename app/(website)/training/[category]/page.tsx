import { notFound } from "next/navigation";
import { TrainingCategoryClient } from "@/components/training-category-client";

interface PageProps {
  params: Promise<{ category: string }>;
}

// Generate static params for static generation/pre-rendering optimization
export async function generateStaticParams() {
  return [
    { category: "gym" },
    { category: "boxing" },
    { category: "fitness" }
  ];
}

// Dynamically generate SEO tags and OpenGraph configurations
export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;

  if (category !== "gym" && category !== "boxing" && category !== "fitness") {
    return {};
  }

  const categoryDetails = {
    gym: {
      title: "Gym Training School | Boxing Essential",
      description: "Build foundational boxing strength, explosive muscle power, and full-body conditioning with fighter weights and core circuits.",
    },
    boxing: {
      title: "Boxing Training School | Boxing Essential",
      description: "Master ring strategy, rapid footwork mechanics, snappy punch combinations, and pocket defense from elite trainers.",
    },
    fitness: {
      title: "Fitness Training School | Boxing Essential",
      description: "Get in peak boxer shape with high-intensity cardio boxing intervals, fat-burn shadowboxing circuits, and endurance exercises.",
    },
  }[category];

  return {
    title: categoryDetails.title,
    description: categoryDetails.description,
    openGraph: {
      title: categoryDetails.title,
      description: categoryDetails.description,
      type: "website",
      url: `https://boxingessential.com/training/${category}`,
      images: [
        {
          url: "https://images.pexels.com/photos/4761359/pexels-photo-4761359.jpeg?auto=compress&cs=tinysrgb&w=800",
          width: 800,
          height: 600,
          alt: `${categoryDetails.title} Banner`,
        }
      ]
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;

  // Validate request category parameters
  if (category !== "gym" && category !== "boxing" && category !== "fitness") {
    notFound();
  }

  return <TrainingCategoryClient category={category} />;
}
