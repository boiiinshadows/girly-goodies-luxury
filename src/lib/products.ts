import perfume1 from "@/assets/p-perfume-1.jpg";
import perfume2 from "@/assets/p-perfume-2.jpg";
import bag1 from "@/assets/p-bag-1.jpg";
import bag2 from "@/assets/p-bag-2.jpg";
import sandal1 from "@/assets/p-sandal-1.jpg";
import sandal2 from "@/assets/p-sandal-2.jpg";

export type Category = "Perfumes" | "Handbags" | "Sandals";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
  badge?: string;
}

export const products: Product[] = [
  { id: "p1", name: "Rose Éternelle", description: "A whisper of damask rose, white musk and silk amber. Bottled poetry.", price: 148, image: perfume1, category: "Perfumes", rating: 4.9, badge: "Bestseller" },
  { id: "p2", name: "Ambre Nuit", description: "Smoky amber wrapped in vanilla and Tahitian gardenia.", price: 168, image: perfume2, category: "Perfumes", rating: 4.8 },
  { id: "p3", name: "Velvet Bloom EDP", description: "Peony, peach blossom, and cashmere woods. Soft. Unforgettable.", price: 132, image: perfume1, category: "Perfumes", rating: 4.7, badge: "New" },
  { id: "p4", name: "Mademoiselle Quilted", description: "Hand-stitched lambskin in blush rose with signature gold chain.", price: 389, image: bag1, category: "Handbags", rating: 4.9, badge: "Bestseller" },
  { id: "p5", name: "Noir Petite", description: "A structured top-handle in midnight calf leather. Day to night.", price: 425, image: bag2, category: "Handbags", rating: 4.8 },
  { id: "p6", name: "Cloud Mini Tote", description: "Soft pillow leather with a buttery, sculptural silhouette.", price: 298, image: bag1, category: "Handbags", rating: 4.6, badge: "New" },
  { id: "p7", name: "Crème Block Heel", description: "Architectural block heel in cream nappa. Effortless every step.", price: 215, image: sandal1, category: "Sandals", rating: 4.7 },
  { id: "p8", name: "Doré Strappy Heel", description: "Liquid gold straps on a slender stiletto. For nights worth remembering.", price: 245, image: sandal2, category: "Sandals", rating: 4.8, badge: "Bestseller" },
  { id: "p9", name: "Soft Step Slide", description: "Padded leather slides in champagne. Comfort, refined.", price: 178, image: sandal1, category: "Sandals", rating: 4.6 },
];

export const bestSellers = products.filter((p) => p.badge === "Bestseller" || p.rating >= 4.8);
