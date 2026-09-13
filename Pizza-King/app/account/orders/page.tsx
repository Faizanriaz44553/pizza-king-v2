// app/account/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { subscribeToAuthChanges } from "@/lib/auth";
import { User } from "firebase/auth";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/lib/orders";

export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);

      try {
        const q = query(
          collection(db, "orders"),
          where("userEmail", "==", currentUser.email),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-charcoal/50">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-16">
      <h1 className="font-display font-700 text-3xl text-charcoal mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-14 h-14 text-charcoal/20 mx-auto mb-4" />
          <p className="text-charcoal/60">You haven't placed any orders yet.</p>
          <Link
            href="/menu"
            className="inline-block mt-6 bg-tomato hover:bg-tomatoDark transition-colors text-cream font-semibold px-6 py-3 rounded-full"
          >
            Order Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/track-order/${order.id}`}
              className="block bg-white border border-charcoal/10 rounded-xl p-5 hover:border-tomato/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-charcoal">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-charcoal/50 mt-1">
                    {order.items?.length} item(s) • {formatPrice(order.total)}
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cheese/20 text-cheese uppercase">
                  {order.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}