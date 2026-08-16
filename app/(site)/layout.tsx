import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress, ScrollReveal } from "@/components/site/ScrollMotion";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <ScrollReveal direction="up"><Footer /></ScrollReveal>
    </div>
  );
}
