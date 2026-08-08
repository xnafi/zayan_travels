"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const closeMenu = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2" aria-label="Zayan Travels home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary">
            <Plane className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-xl font-bold text-brand-dark">
            Zayan<span className="text-brand-primary">Travels</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-brand-muted hover:bg-slate-100 hover:text-brand-dark"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="ml-4">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-brand-dark hover:bg-slate-100 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-brand-muted hover:bg-slate-100 hover:text-brand-dark"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={closeMenu} className="mt-2">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}