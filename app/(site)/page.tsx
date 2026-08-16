import { Metadata } from "next";
import { HeroSection } from "@/components/site/HeroSection";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { AboutSection } from "@/components/site/AboutSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { ReviewsCarousel } from "@/components/site/ReviewsCarousel";
import { CTABanner } from "@/components/site/CTABanner";
import { fetchGoogleReviews } from "@/lib/google-places";
import { ScrollReveal } from "@/components/site/ScrollMotion";

export const metadata: Metadata = {
  title: "Zayan Travels — Expert Visa Consulting",
  description:
    "Your Journey to the World Starts Here. Zayan Travels — Expert visa consulting for 50+ countries with fast processing and high success rates.",
  openGraph: {
    title: "Zayan Travels — Expert Visa Consulting",
    description:
      "Your Journey to the World Starts Here. Expert visa consulting for 50+ countries.",
    type: "website",
  },
};

export default async function HomePage() {
  let googleReviews;
  try {
    googleReviews = await fetchGoogleReviews();
  } catch {
    googleReviews = null;
  }

  return (
    <>
      <HeroSection />
      <ScrollReveal><WhyChooseUs /></ScrollReveal>
      <ScrollReveal direction="right"><AboutSection /></ScrollReveal>
      <ScrollReveal direction="left"><ServicesSection /></ScrollReveal>
      {googleReviews && googleReviews.reviews.length > 0 && (
        <ScrollReveal direction="left">
          <ReviewsCarousel
            reviews={googleReviews.reviews}
            rating={googleReviews.rating}
            totalRatings={googleReviews.totalRatings}
          />
        </ScrollReveal>
      )}
      <ScrollReveal direction="up" delay={0.08}><CTABanner /></ScrollReveal>
    </>
  );
}
