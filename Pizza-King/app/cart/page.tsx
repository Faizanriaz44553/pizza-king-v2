// app/cart/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-14 h-14 text-charcoal/20 mx-auto mb-4" />
        <h2 className="font-display font-700 text-2xl text-charcoal">
          Your cart is empty
        </h2>
        <p className="text-charcoal/50 mt-2">
          Looks like you haven't added any pizza yet.
        </p>
        <Link
          href="/menu"
          className="inline-block mt-6 bg-tomato hover:bg-tomatoDark transition-colors text-cream font-semibold px-6 py-3 rounded-full"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <h1 className="font-display font-700 text-3xl text-charcoal mb-6">
          Your Cart
        </h1>
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div>
        <OrderSummary
          subtotal={getTotal()}
          onSubmit={() => router.push("/checkout")}
        />
      </div>
    </div>
  );
}