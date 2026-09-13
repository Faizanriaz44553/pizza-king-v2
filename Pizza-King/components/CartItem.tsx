// components/CartItem.tsx
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore, CartItem as CartItemType } from "@/store/cartStore";

export default function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-4 py-5 border-b border-charcoal/10">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cheese/10 shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-charcoal">{item.name}</h3>
            <p className="text-xs text-charcoal/50 capitalize mt-0.5">
              {item.size}
              {item.toppings.length > 0 && ` • +${item.toppings.length} toppings`}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-charcoal/40 hover:text-tomato transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 border border-charcoal/15 rounded-full px-2 py-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:text-tomato"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-semibold w-5 text-center text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:text-tomato"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="font-semibold text-tomato">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}