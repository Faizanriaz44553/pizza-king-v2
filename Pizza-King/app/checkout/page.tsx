// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import OrderSummary from "@/components/OrderSummary";
import { formatPrice } from "@/lib/utils";
import { createOrder } from "@/lib/orders";
import { auth } from "@/lib/firebase";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "cod", // cod = cash on delivery
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^03\d{9}$/.test(form.phone))
      newErrors.phone = "Enter valid phone (e.g. 03001234567)";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handlePlaceOrder = async () => {
  if (!validate()) return;
  setSubmitting(true);

  try {
   const orderId = await createOrder({
  name: form.name,
  phone: form.phone,
  address: form.address,
  city: form.city,
  payment: form.payment,
  userEmail: auth.currentUser?.email || undefined,   // ← YE LINE ADD KAREN
  items: items.map((item) => ({
    name: item.name,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
  })),
  total: getTotal(),
});

    clearCart();
    router.push(`/order-success?orderId=${orderId}`);
  } catch (err) {
    console.error(err);
    alert("Something went wrong placing your order. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-charcoal/60">
          Your cart is empty. Add pizzas before checking out.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <h1 className="font-display font-700 text-3xl text-charcoal mb-6">
          Checkout
        </h1>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-charcoal">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ali Khan"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato"
            />
            {errors.name && (
              <p className="text-tomato text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-charcoal">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="03001234567"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato"
            />
            {errors.phone && (
              <p className="text-tomato text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-charcoal">
              Delivery Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House #, Street, Area"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato"
            />
            {errors.address && (
              <p className="text-tomato text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-charcoal">
              City
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Karachi"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato"
            />
            {errors.city && (
              <p className="text-tomato text-xs mt-1">{errors.city}</p>
            )}
          </div>

          <div>
  <label className="text-sm font-semibold text-charcoal">
    Payment Method
  </label>
  <div className="mt-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-basil/30 bg-basil/5">
    <div className="w-5 h-5 rounded-full border-2 border-basil flex items-center justify-center shrink-0">
      <div className="w-2.5 h-2.5 rounded-full bg-basil" />
    </div>
    <div>
      <p className="font-semibold text-charcoal text-sm">Cash on Delivery</p>
      <p className="text-xs text-charcoal/50">Pay in cash when your order arrives</p>
    </div>
  </div>
  <p className="text-xs text-charcoal/40 mt-2">
    Online payments coming soon.
  </p>
</div>
        </div>
      </div>

      <div>
        <OrderSummary
          subtotal={getTotal()}
          buttonText={submitting ? "Placing Order..." : "Place Order"}
          onSubmit={handlePlaceOrder}
          disabled={submitting}
        />
      </div>
    </div>
  );
}