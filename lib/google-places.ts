import { getEnv } from "@/lib/env";

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  authorUrl?: string | null;
  languageCode?: string | null;
}

export interface GooglePlaceResult {
  reviews: GoogleReview[];
  rating: number;
  totalRatings: number;
}

export async function fetchGoogleReviews(): Promise<GooglePlaceResult> {
  const env = getEnv();
  const url = `https://places.googleapis.com/v1/places/${env.GOOGLE_PLACE_ID}`;

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY,
      "X-Goog-FieldMask": "reviews,rating,userRatingCount",
    },
    next: { revalidate: 21600 },
  });

  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.status}`);
  }

  const data = (await response.json()) as {
    reviews?: Array<{
      authorName?: string;
      rating?: number;
      text?: { text?: string };
      relativeTimeDescription?: string;
      authorAttribution?: { uri?: string };
    }>;
    rating?: number;
    userRatingCount?: number;
  };

  const reviews: GoogleReview[] = (data.reviews ?? [])
    .map((review) => ({
      authorName: review.authorName ?? "Anonymous",
      rating: review.rating ?? 0,
      text: review.text?.text ?? "",
      relativeTime: review.relativeTimeDescription ?? "",
      authorUrl: review.authorAttribution?.uri ?? null,
      languageCode: null,
    }))
    .filter((review) => review.text.length > 0);

  return {
    reviews,
    rating: data.rating ?? 0,
    totalRatings: data.userRatingCount ?? 0,
  };
}