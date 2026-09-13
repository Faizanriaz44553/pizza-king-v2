// app/track-order/[orderId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Order, OrderStatus } from "@/lib/orders";
import { CheckCircle2, Package, Truck, ChefHat } from "lucide-react";

const stages = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "preparing", label: "Preparing", icon: ChefHat },
  { key: "out-for-delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() } as Order);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center text-charcoal/50">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-charcoal/60">Order not found.</p>
      </div>
    );
  }

  const currentIndex = stages.findIndex((s) => s.key === order.status);

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-16">
      <div className="text-center mb-10">
        <span className="text-tomato text-sm font-semibold uppercase tracking-wide">
          Order Tracking
        </span>
        <h1 className="font-display font-700 text-3xl text-charcoal mt-2">
          Order #{order.id.slice(0, 8).toUpperCase()}
        </h1>
        <p className="text-charcoal/60 mt-2">
          Estimated delivery: <span className="font-semibold text-charcoal">25–30 min</span>
        </p>
      </div>

      {/* Progress Stages */}
      <div className="bg-cheese/10 rounded-2xl p-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-charcoal/10 -z-0" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-tomato transition-all duration-500 -z-0"
            style={{
              width: `${(currentIndex / (stages.length - 1)) * 100}%`,
            }}
          />

          {stages.map((stage, index) => {
            const isDone = index <= currentIndex;
            const Icon = stage.icon;
            return (
              <div
                key={stage.key}
                className="flex flex-col items-center gap-2 relative z-10 flex-1"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isDone
                      ? "bg-tomato border-tomato text-cream"
                      : "bg-white border-charcoal/20 text-charcoal/30"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-semibold text-center ${
                    isDone ? "text-charcoal" : "text-charcoal/40"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details */}
      <div className="mt-8 bg-white border border-charcoal/10 rounded-2xl p-6">
        <h3 className="font-semibold text-charcoal mb-3">Order Details</h3>
        <div className="space-y-2 text-sm">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between text-charcoal/70">
              <span>
                {item.quantity}x {item.name} ({item.size})
              </span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-charcoal/10 mt-3 pt-3 flex justify-between font-semibold text-charcoal">
          <span>Total</span>
          <span className="text-tomato">Rs. {order.total}</span>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-charcoal/50">
        We'll notify you when your order status changes. Questions? Call us
        at +92 300 1234567.
      </div>
    </div>
  );
}