import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cartStore, useCart } from "@/lib/cart-store";

export function CartDrawer() {
  const cart = useCart();
  const [checkout, setCheckout] = useState(false);
  const total = cart.items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <AnimatePresence>
      {cart.open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { cartStore.setOpen(false); setCheckout(false); }}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full sm:w-[440px] bg-background flex flex-col shadow-luxe"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">{checkout ? "Checkout" : "Your bag"}</div>
                <div className="font-display text-2xl mt-1">{checkout ? "Almost yours" : `${cart.items.length} item${cart.items.length === 1 ? "" : "s"}`}</div>
              </div>
              <button onClick={() => { cartStore.setOpen(false); setCheckout(false); }} aria-label="Close" className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!checkout ? (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {cart.items.length === 0 && (
                    <div className="text-center text-foreground/50 mt-20">
                      <div className="font-display text-2xl mb-3">Your bag is empty</div>
                      <p className="text-sm">Add a little something beautiful.</p>
                    </div>
                  )}
                  {cart.items.map((i) => (
                    <motion.div
                      key={i.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="flex gap-4"
                    >
                      <img src={i.image} alt={i.name} width={100} height={120} className="w-20 h-24 object-cover rounded-xl" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">{i.category}</div>
                        <div className="font-display text-lg truncate">{i.name}</div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center gap-1 border border-border rounded-full">
                            <button onClick={() => cartStore.setQty(i.id, i.qty - 1)} className="w-7 h-7 flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                            <span className="text-xs w-5 text-center">{i.qty}</span>
                            <button onClick={() => cartStore.setQty(i.id, i.qty + 1)} className="w-7 h-7 flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                          </div>
                          <button onClick={() => cartStore.removeFromCart(i.id)} className="text-xs text-foreground/50 hover:text-accent">Remove</button>
                        </div>
                      </div>
                      <div className="font-display text-lg">${i.qty * i.price}</div>
                    </motion.div>
                  ))}
                </div>
                {cart.items.length > 0 && (
                  <div className="p-6 border-t border-border space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">Subtotal</span>
                      <span>${total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">Shipping</span>
                      <span className="text-accent">Complimentary</span>
                    </div>
                    <div className="flex justify-between font-display text-2xl pt-2 border-t border-border">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                    <button
                      onClick={() => setCheckout(true)}
                      className="w-full bg-foreground text-background py-4 rounded-full text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:gap-3 transition-all duration-500"
                    >
                      Checkout <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Checkout total={total} onBack={() => setCheckout(false)} />
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Checkout({ total, onBack }: { total: number; onBack: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {!done ? (
        <form
          onSubmit={(e) => { e.preventDefault(); setDone(true); }}
          className="space-y-4"
        >
          {[
            { l: "Email", t: "email" },
            { l: "Full name", t: "text" },
            { l: "Address", t: "text" },
          ].map((f) => (
            <label key={f.l} className="block">
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">{f.l}</span>
              <input required type={f.t} className="mt-1 w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-accent outline-none" />
            </label>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">Card</span>
              <input required className="mt-1 w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-accent outline-none" placeholder="•••• •••• •••• ••••" />
            </label>
            <label className="block">
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">CVV</span>
              <input required className="mt-1 w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-accent outline-none" placeholder="•••" />
            </label>
          </div>
          <div className="pt-3 flex gap-3">
            <button type="button" onClick={onBack} className="px-5 py-3.5 rounded-full border border-border text-xs tracking-[0.2em] uppercase">Back</button>
            <button className="flex-1 bg-foreground text-background py-3.5 rounded-full text-xs tracking-[0.2em] uppercase">Pay ${total}</button>
          </div>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="h-full flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 rounded-full gradient-rose flex items-center justify-center text-background text-3xl mb-6">✓</div>
          <div className="font-display text-3xl mb-2">Merci, beautiful.</div>
          <p className="text-foreground/60 text-sm max-w-xs">Your order is being wrapped with love. A confirmation is on its way.</p>
        </motion.div>
      )}
    </div>
  );
}
