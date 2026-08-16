import type { Metadata } from "next";
import { Globe2, Users, Award, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Zayan Travels — our story, mission, and the team behind our high visa success rate.",
};

const teamMembers = [
  {
    name: "Zayan Ahmed",
    role: "Founder & CEO",
    avatar: "ZA",
    bio: "15+ years in international travel and visa consulting.",
  },
  {
    name: "Sarah Rahman",
    role: "Head of Visa Operations",
    avatar: "SR",
    bio: "Expert in complex visa applications across 30+ countries.",
  },
  {
    name: "Michael Chen",
    role: "Senior Visa Consultant",
    avatar: "MC",
    bio: "Specializes in business and work visa processing.",
  },
  {
    name: "Aisha Khan",
    role: "Client Relations Manager",
    avatar: "AK",
    bio: "Dedicated to providing exceptional client support.",
  },
];

const stats = [
  { icon: Globe2, value: "50+", label: "Countries Covered" },
  { icon: Users, value: "10K+", label: "Visas Processed" },
  { icon: Award, value: "10+", label: "Years of Experience" },
  { icon: CheckCircle2, value: "98%", label: "Success Rate" },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-dark">
      <section className="bg-gradient-to-br from-brand-primary to-brand-dark py-20 text-white">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            About <span className="text-brand-secondary">Zayan Travels</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            We&rsquo;ve been helping people explore the world since 2015 with
            expert visa consulting and personalized service.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-brand-secondary">
                Our Story
              </h2>
              <p className="mt-4 text-lg text-brand-muted">
                Zayan Travels was founded in 2015 with a simple mission: to
                make international travel accessible to everyone. What started
                as a small visa consulting office has grown into a trusted
                agency serving thousands of clients across 50+ countries.
              </p>
              <p className="mt-4 text-lg text-brand-muted">
                Our team of certified visa consultants brings decades of
                combined experience in immigration law, document preparation,
                and embassy relations. We stay up-to-date with the latest visa
                policies to ensure your application has the best chance of
                success.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-brand-line bg-brand-surface p-6 text-center"
                >
                  <stat.icon className="mx-auto h-8 w-8 text-brand-primary" />
                  <p className="mt-3 font-display text-3xl font-bold text-brand-secondary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-brand-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-surface py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-brand-secondary">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-brand-muted">
              To simplify the visa application process and empower individuals
              and families to explore the world with confidence. We believe
              that travel transforms lives, and we&rsquo;re here to make it
              happen for you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-brand-secondary">
              Meet Our <span className="text-brand-primary">Team</span>
            </h2>
            <p className="mt-4 text-lg text-brand-muted">
              The dedicated professionals behind your successful visa
              applications.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-brand-line bg-brand-surface p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10">
                  <span className="font-display text-2xl font-bold text-brand-primary">
                    {member.avatar}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-secondary">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-brand-primary">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-brand-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
