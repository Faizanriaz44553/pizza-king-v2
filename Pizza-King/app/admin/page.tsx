// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPizzas } from "@/lib/pizzas";
import { getAllOrders, Order } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, Pizza, DollarSign, Clock, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [pizzaCount, setPizzaCount] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pizzas, ordersData] = await Promise.all([
          getAllPizzas(),
          getAllOrders(),
        ]);
        setPizzaCount(pizzas.length);
        setOrders(ordersData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-tomato bg-tomato/10",
    },
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      color: "text-basil bg-basil/10",
    },
    {
      label: "Pending Orders",
      value: pendingCount,
      icon: Clock,
      color: "text-cheese bg-cheese/20",
    },
    {
      label: "Menu Items",
      value: pizzaCount,
      icon: Pizza,
      color: "text-charcoal bg-charcoal/10",
    },
  ];

  return (
    <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
      <h1 className="font-display font-700 text-3xl text-charcoal mb-8">
        Dashboard
      </h1>

      {loading ? (
        <div className="text-center py-16 text-charcoal/50">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-ivory border border-charcoal/10 rounded-2xl p-5"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-display font-700 text-charcoal">
                  {stat.value}
                </p>
                <p className="text-sm text-charcoal/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-ivory border border-charcoal/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-700 text-xl text-charcoal">
                Recent Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-sm font-semibold text-tomato hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-charcoal/50 text-sm py-8 text-center">
                No orders yet.
              </p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-charcoal/5 last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-charcoal text-sm">
                        {order.name}
                      </p>
                      <p className="text-xs text-charcoal/50">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-tomato text-sm">
                        {formatPrice(order.total)}
                      </p>
                      <span className="text-xs text-charcoal/50 uppercase">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}