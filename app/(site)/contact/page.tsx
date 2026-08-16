import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Zayan Travels for expert visa consulting. Contact us for tourist, business, student, and work visa assistance.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Travel Street", "Dhaka, Bangladesh"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+880 1234 567 890", "Mon–Sat, 9am–6pm"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@zayantravels.com", "We reply within 24 hours"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon–Fri: 9am–6pm", "Sat: 10am–4pm"],
  },
];

export default function ContactPage() {
  return (
    <div className="bg-brand-dark">
      <section className="bg-gradient-to-br from-brand-primary to-brand-dark py-20 text-white">
        <div className="container-page text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            Contact <span className="text-brand-secondary">Us</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Have a question about your visa application? Our team is here to
            help you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-brand-secondary">
                Get in Touch
              </h2>
              <p className="mt-2 text-brand-muted">
                Reach out to us through any of the following channels, or fill
                out the form and we&rsquo;ll get back to you.
              </p>

              <div className="mt-8 space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                      <info.icon className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-brand-secondary">
                        {info.title}
                      </h3>
                      {info.lines.map((line) => (
                        <p key={line} className="text-sm text-brand-muted">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-xl border border-brand-line bg-brand-surface p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-2xl font-bold text-brand-secondary">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-brand-muted">
                  Fill out the form below and our visa experts will contact you
                  shortly.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
