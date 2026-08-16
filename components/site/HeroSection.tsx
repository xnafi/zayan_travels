"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroDepth } from "@/components/site/ScrollMotion";

export function HeroSection() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 140]);
  return <section className="relative flex min-h-screen items-end overflow-hidden bg-brand-dark pb-20 pt-32 sm:pb-28">
    <HeroDepth>
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-24 bg-[url('/images/zayan-hero.png')] bg-cover bg-center" aria-hidden="true" />
    </HeroDepth>
    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/75 to-brand-dark/20" /><div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/30" /><div className="film-grain pointer-events-none absolute inset-0 opacity-30" />
    <div className="container-page relative z-10 w-full"><motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="max-w-4xl"><p className="eyebrow mb-6">Visa consultancy · Est. 2015</p><h1 className="max-w-4xl text-balance text-6xl font-medium leading-[.9] text-brand-secondary sm:text-8xl lg:text-[8.5rem]">Go further.<br /><em className="text-brand-primary">We&apos;ll handle the rest.</em></h1><p className="mt-8 max-w-lg text-base leading-relaxed text-brand-secondary/70 sm:text-lg">Expert visa guidance for the journeys that change everything. From first document to final departure.</p><div className="mt-9 flex flex-wrap items-center gap-4"><Link href="/services"><Button size="lg" className="rounded-none bg-brand-primary px-7 text-brand-dark hover:bg-brand-secondary">Explore services <ArrowRight data-icon="inline-end" /></Button></Link><Link href="/contact" className="border-b border-brand-secondary/40 pb-2 text-xs uppercase tracking-[0.2em] text-brand-secondary transition-colors hover:border-brand-primary hover:text-brand-primary">Start a conversation</Link></div></motion.div><div className="mt-20 flex items-end justify-between border-t border-brand-secondary/20 pt-5 text-xs uppercase tracking-[0.18em] text-brand-secondary/60"><span>50+ countries</span><span className="hidden sm:inline">10k+ journeys made possible</span><span>Scroll to discover <ArrowDown className="ml-2 inline size-4 text-brand-primary" /></span></div></div>
  </section>;
}
