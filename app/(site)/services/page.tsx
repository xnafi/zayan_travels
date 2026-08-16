import type { Metadata } from "next";
import Link from "next/link";
import {
  Plane,
  Briefcase,
  GraduationCap,
  Building2,
  Heart,
  Navigation,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Zayan Travels visa services — tourist, business, student, work, family, and transit visas for 50+ countries.",
};

export const dynamic = "force-dynamic";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Briefcase,
  GraduationCap,
  Building2,
  Heart,
  Navigation,
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="bg-brand-surface">
      <section className="bg-gradient-to-br from-brand-primary to-brand-dark py-20 text-white">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            Our <span className="text-brand-secondary">Services</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Comprehensive visa solutions for every travel need. Choose from our
            range of expert services.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = iconMap[service.icon ?? ""] ?? Plane;
              return (
                <Card
                  key={service.id}
                  className="group flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10 transition-colors group-hover:bg-brand-primary">
                    <Icon className="h-6 w-6 text-brand-primary transition-colors group-hover:text-white" />
                  </div>
                  <h2 className="mt-4 font-display text-lg font-semibold text-brand-secondary">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-brand-muted">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary/80"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 rounded-xl border border-brand-line bg-brand-dark p-8 text-center shadow-sm">
            <h2 className="font-display text-2xl font-bold text-brand-secondary">
              Need a Custom Solution?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-brand-muted">
              Contact us for specialized visa requirements or destinations not
              listed above. Our experts will find the right solution for you.
            </p>
            <Link href="/contact" className="mt-6 inline-block">
              <Button size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
