"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-dark">
      {/* Animated background elements */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-secondary/20 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <Globe2 className="absolute right-10 top-10 h-24 w-24 text-white/10" />
        <Globe2 className="absolute bottom-10 left-10 h-32 w-32 text-white/5" />
      </motion.div>

      <div className="container-page relative z-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-secondary" />
            Trusted Visa Experts Since 2015
          </span>
        </motion.div>

        <motion.h1
          className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Your Journey to the World{" "}
          <span className="text-brand-secondary">Starts Here</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Zayan Travels — Expert visa consulting for 50+ countries. Fast
          processing, expert guidance, and a high success rate.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/services">
            <Button size="lg" className="w-full sm:w-auto">
              Explore Services
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 flex items-center justify-center gap-8 text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-white">50+</p>
            <p className="mt-1 text-sm">Countries</p>
          </div>
          <div className="h-12 w-px bg-white/20" />
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-white">10K+</p>
            <p className="mt-1 text-sm">Visas Processed</p>
          </div>
          <div className="h-12 w-px bg-white/20" />
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-white">98%</p>
            <p className="mt-1 text-sm">Success Rate</p>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#why-choose-us"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-white"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.a>
    </section>
  );
}