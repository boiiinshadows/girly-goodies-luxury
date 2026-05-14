import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-foreground text-background pt-24 pb-10 px-(--spacing-content-px) relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] md:w-[800px] md:h-[400px] rounded-full gradient-rose blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h3 className="font-display text-4xl lg:text-5xl">Join the maison</h3>
          <p className="mt-4 text-background/60">
            Private launches, soft scents and styling letters — straight to your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
            className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Your email"
              className="flex-1 px-5 py-4 rounded-full bg-background/10 border border-background/15 placeholder:text-background/40 outline-none focus:border-accent transition-colors"
            />
            <button className="px-7 py-4 rounded-full gradient-rose text-background label-xs hover:scale-[1.02] transition-transform">
              {sent ? "Welcome" : "Subscribe"}
            </button>
          </form>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pt-14 border-t border-background/10">
          <div className="col-span-2 lg:col-span-1">
            <div className="font-display text-3xl">
              Girly <span className="gradient-gold">Goodies</span>
            </div>
            <p className="mt-4 text-sm text-background/55 max-w-xs leading-relaxed">
              Soft luxury for the modern woman. Made in small batches, with love.
            </p>
          </div>

          {[
            { t: "Shop", l: ["Perfumes", "Handbags", "Sandals", "New Arrivals"] },
            { t: "House", l: ["Our Story", "Ateliers", "Sustainability", "Press"] },
            { t: "Care", l: ["Contact", "Shipping", "Returns", "Size Guide"] },
          ].map((c) => (
            <div key={c.t}>
              <div className="label-xs text-background/50 mb-4">{c.t}</div>
              <ul className="space-y-3">
                {c.l.map((it) => (
                  <li key={it}>
                    <a
                      href="#"
                      className="text-sm text-background/80 hover:text-accent transition-colors"
                    >
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-background/50">
          <div>&copy; 2026 Girly Goodies. All rights reserved.</div>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter, Mail].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="w-11 h-11 rounded-full border border-background/15 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              >
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
