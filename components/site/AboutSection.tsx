import Link from "next/link";
import { Globe2, Users, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const stats = [
  { icon: Globe2, value: "50+", label: "Countries Covered" },
  { icon: Users, value: "10K+", label: "Visas Processed" },
  { icon: Award, value: "10+", label: "Years of Experience" },
  { icon: CheckCircle2, value: "98%", label: "Success Rate" },
];

export function AboutSection() {
  return (
    <section className="bg-brand-surface py-20">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
              About Zayan Travels
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
              Your Trusted Partner in Global Travel
            </h2>
            <p className="mt-4 text-lg text-brand-muted">
              Since 2015, Zayan Travels has been helping individuals and
              families achieve their international travel dreams. We combine
              deep expertise in visa regulations with personalized service to
              deliver the highest success rates in the industry.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Certified and experienced visa consultants",
                "Transparent pricing with no hidden fees",
                "End-to-end application management",
                "Latest visa policy updates and guidance",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <span className="text-brand-muted">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/about" className="mt-8 inline-block">
              <Button variant="outline">Learn More About Us</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <stat.icon className="mx-auto h-8 w-8 text-brand-primary" />
                <p className="mt-3 font-display text-3xl font-bold text-brand-dark">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-brand-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}