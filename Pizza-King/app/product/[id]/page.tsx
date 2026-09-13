// app/product/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getPizzaById, Pizza } from "@/lib/pizzas";
import { sizeMultiplier, availableToppings } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import SizeSelector from "@/components/SizeSelector";
import ToppingsSelector from "@/components/ToppingsSelector";
import { Minus, Plus } from "lucide-react";

type Size = "small" | "medium" | "large";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState<Size>("small");
  const [toppings, setToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchPizza() {
      const id = params.id as string;
      const data = await getPizzaById(id);
      setPizza(data);
      setLoading(false);
    }
    fetchPizza();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-charcoal/50">
        Loading...
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-charcoal/60">Pizza not found.</p>
      </div>
    );
  }

  const toggleTopping = (id: string) => {
    setToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toppingsPrice = toppings.reduce((sum, id) => {
    const t = availableToppings.find((t) => t.id === id);
    return sum + (t?.price || 0);
  }, 0);

  const unitPrice = Math.round(
    pizza.basePrice * sizeMultiplier[size] + toppingsPrice
  );
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const cartId = `${pizza.id}-${size}-${toppings.sort().join(",")}`;
    addItem({
      id: cartId,
      pizzaId: pizza.id,
      name: pizza.name,
      image: pizza.image,
      size,
      toppings,
      price: unitPrice,
      quantity,
    });
    router.push("/cart");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-cheese/10">
        <Image src={pizza.image} alt={pizza.name} fill className="object-cover" />
      </div>

      {/* Details */}
      <div>
        <span className="text-xs uppercase tracking-wide text-basil font-semibold">
          {pizza.category}
        </span>
        <h1 className="font-display font-700 text-3xl text-charcoal mt-1">
          {pizza.name}
        </h1>
        <p className="text-charcoal/60 mt-2">{pizza.description}</p>

        <div className="mt-6 space-y-6">
          <SizeSelector selected={size} onChange={setSize} />
          <ToppingsSelector selected={toppings} onToggle={toggleTopping} />
        </div>

        {/* Quantity + Price */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-charcoal/10">
          <div className="flex items-center gap-3 border border-charcoal/15 rounded-full px-3 py-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1 hover:text-tomato"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1 hover:text-tomato"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <span className="font-display font-700 text-2xl text-tomato">
            {formatPrice(totalPrice)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-6 bg-tomato hover:bg-tomatoDark transition-colors text-cream font-semibold py-4 rounded-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}