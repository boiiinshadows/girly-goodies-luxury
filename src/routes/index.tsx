import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { BestSellers } from "@/components/site/BestSellers";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Story } from "@/components/site/Story";
import { Testimonials } from "@/components/site/Testimonials";
import { Gallery } from "@/components/site/Gallery";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { QuickView } from "@/components/site/QuickView";
import type { Product } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Girly Goodies — Soft Luxury Perfumes, Handbags & Sandals" },
      { name: "description", content: "Hand-curated perfumes, designer handbags and elegant sandals for the modern woman. Soft luxury, made in small batches." },
    ],
  }),
});

function Index() {
  const [quick, setQuick] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <BestSellers onQuickView={setQuick} />
        <ProductGrid onQuickView={setQuick} />
        <Story />
        <Testimonials />
        <Gallery />
      </main>
      <Footer />
      <CartDrawer />
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
