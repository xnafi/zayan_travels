"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" }, { href: "/contact", label: "Contact" }];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const closeMenu = React.useCallback(() => setIsOpen(false), []);
  return <header className={cn("fixed inset-x-0 top-0 z-40 border-b border-transparent transition-all duration-500", scrolled && "border-brand-line bg-brand-dark/85 backdrop-blur-xl")}>
    <nav className="container-page flex h-20 items-center justify-between" aria-label="Main navigation">
      <Link href="/" className="flex items-center gap-3" aria-label="Zayan Travels home"><span className="flex size-9 items-center justify-center border border-brand-primary/60 text-brand-primary"><Plane className="size-4" /></span><span className="font-display text-2xl font-semibold tracking-wide text-brand-secondary">Zayan<span className="text-brand-primary">.</span></span></Link>
      <div className="hidden items-center gap-7 md:flex">{navLinks.map((link) => <Link key={link.href} href={link.href} className={cn("text-xs uppercase tracking-[0.2em] transition-colors", pathname === link.href ? "text-brand-primary" : "text-brand-secondary/70 hover:text-brand-secondary")}>{link.label}</Link>)}<Link href="/contact"><Button size="sm" className="rounded-none bg-brand-primary px-5 text-brand-dark hover:bg-brand-secondary">Begin Your Journey</Button></Link></div>
      <button className="p-2 text-brand-secondary md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>{isOpen ? <X className="size-6" /> : <Menu className="size-6" />}</button>
    </nav>
    {isOpen && <div className="border-t border-brand-line bg-brand-dark px-5 py-5 md:hidden"><div className="container-page flex flex-col gap-4">{navLinks.map((link) => <Link key={link.href} href={link.href} onClick={closeMenu} className="py-2 text-sm uppercase tracking-[0.2em] text-brand-secondary">{link.label}</Link>)}<Link href="/contact" onClick={closeMenu}><Button className="w-full rounded-none bg-brand-primary text-brand-dark">Begin Your Journey</Button></Link></div></div>}
  </header>;
}
