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

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Briefcase,
  GraduationCap,
  Building2,
  Heart,
  Navigation,
};

export async function ServicesSection() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    take: 6,
  });

  return (
    <section className="bg-brand-surface py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            Our <span className="text-brand-primary">Services</span>
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Comprehensive visa solutions tailored to your travel needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-dark">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-brand-muted">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary/80"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}