// app/order-success/page.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <CheckCircle2 className="w-16 h-16 text-basil mx-auto mb-5" />
      <h1 className="font-display font-700 text-3xl text-charcoal">
        Order Placed!
      </h1>
      <p className="text-charcoal/60 mt-3">
        Your pizza is being prepared. We'll have it at your door soon.
      </p>

      {orderId && (
        <div className="inline-block mt-6 px-5 py-3 rounded-xl bg-cheese/10 border border-cheese/30">
          <span className="text-sm text-charcoal/60">Order ID</span>
          <p className="font-display font-700 text-lg text-tomato">
            {orderId}
          </p>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <Link
          href="/menu"
          className="border border-charcoal/15 hover:border-tomato hover:text-tomato transition-colors px-6 py-3 rounded-full font-semibold"
        >
          Order More
        </Link>
        <Link
          href="/"
          className="bg-tomato hover:bg-tomatoDark transition-colors text-cream px-6 py-3 rounded-full font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}