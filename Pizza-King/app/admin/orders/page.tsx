// app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus, Order, OrderStatus } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";

const statusOptions: OrderStatus[] = [
  "pending",
  "preparing",
  "out-for-delivery",
  "delivered",
];

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-cheese/20 text-cheese",
  preparing: "bg-tomato/10 text-tomato",
  "out-for-delivery": "bg-basil/10 text-basil",
  delivered: "bg-charcoal/10 text-charcoal",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status);
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <h1 className="font-display font-700 text-3xl text-charcoal mb-8">
        Manage Orders
      </h1>

      {loading ? (
        <div className="text-center py-16 text-charcoal/50">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-14 h-14 text-charcoal/20 mx-auto mb-4" />
          <p className="text-charcoal/60">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-charcoal/10 rounded-xl p-5"
            >
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-semibold text-charcoal">
                    #{order.id.slice(0, 8).toUpperCase()} — {order.name}
                  </h3>
                  <p className="text-sm text-charcoal/50 mt-0.5">
                    {order.phone} • {order.address}, {order.city}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${statusColors[order.status]}`}
                >
                  {order.status.replace(/-/g, " ")}
                </span>
              </div>

              <div className="mt-4 border-t border-charcoal/10 pt-4">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-charcoal/70 py-1"
                  >
                    <span>
                      {item.quantity}x {item.name} ({item.size})
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-charcoal/10">
                <span className="font-semibold text-tomato">
                  Total: {formatPrice(order.total)}
                </span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as OrderStatus)
                  }
                  className="text-sm px-3 py-2 rounded-lg border border-charcoal/15 outline-none focus:border-tomato bg-white"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/-/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}