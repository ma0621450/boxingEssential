import { Star } from "lucide-react";

export function ProductRating({
  rating,
  reviewCount,
}: {
  rating?: number;
  reviewCount?: number;
}) {
  if (!rating) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
      {reviewCount != null && reviewCount > 0 && (
        <span className="text-sm text-muted-foreground">
          ({reviewCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}
