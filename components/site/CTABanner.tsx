import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  return (
    <section className="bg-gradient-to-r from-brand-primary to-brand-dark py-20">
      <div className="container-page text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Ready to Apply? Let&rsquo;s Make It Happen
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Get started with your visa application today. Our experts are ready
          to guide you through every step.
        </p>
        <div className="mt-8">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-brand-secondary text-brand-dark hover:bg-brand-secondary/90"
            >
              Contact Us Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}