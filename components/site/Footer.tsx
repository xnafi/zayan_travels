import Link from "next/link";
import { Plane, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Zayan Travels home">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary">
                <Plane className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-xl font-bold">
                Zayan<span className="text-brand-secondary">Travels</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400">
              Expert visa consulting for 50+ countries. Your journey to the world starts here.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 transition-colors hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">Tourist Visa</li>
              <li className="text-slate-400">Business Visa</li>
              <li className="text-slate-400">Student Visa</li>
              <li className="text-slate-400">Work Visa</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                <span>123 Travel Street, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-brand-secondary" />
                <a href="tel:+8801234567890" className="hover:text-white">
                  +880 1234 567 890
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-brand-secondary" />
                <a href="mailto:info@zayantravels.com" className="hover:text-white">
                  info@zayantravels.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Zayan Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
}