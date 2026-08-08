import { Zap, ShieldCheck, Award, Headphones } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: Zap,
    title: "Fast Processing",
    description:
      "Expedited visa processing with priority handling to get you approved faster.",
  },
  {
    icon: ShieldCheck,
    title: "Expert Guidance",
    description:
      "Our certified visa consultants guide you through every step of the application.",
  },
  {
    icon: Award,
    title: "High Success Rate",
    description:
      "98% approval rate backed by meticulous document preparation and review.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock assistance for all your visa and travel-related queries.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-white py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            Why Choose <span className="text-brand-primary">Zayan Travels</span>
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            We combine expertise, technology, and personalized service to make
            your visa application process seamless.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10 transition-colors group-hover:bg-brand-primary">
                <feature.icon className="h-6 w-6 text-brand-primary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-brand-dark">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}