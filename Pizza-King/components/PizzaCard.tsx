// components/PizzaCard.tsx
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { pizzas } from "@/lib/data";
import { Pizza } from "@/lib/pizzas";

export default function PizzaCard({ pizza }: { pizza: Pizza }) {
  return (
    <Link
      href={`/product/${pizza.id}`}
      className="group block bg-ivory rounded-2xl overflow-hidden border border-charcoal/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="relative w-full aspect-square bg-cheese/10">
        <Image
          src={pizza.image}
          alt={pizza.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {pizza.isPopular && (
          <span className="absolute top-3 left-3 bg-tomato text-cream text-[11px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
            Popular
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-600 text-lg text-charcoal">
          {pizza.name}
        </h3>
        <p className="text-sm text-charcoal/60 mt-1 line-clamp-2">
          {pizza.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-tomato font-semibold">
            From {formatPrice(pizza.basePrice)}
          </span>
          <span className="text-xs uppercase tracking-wide text-basil font-semibold">
            {pizza.category}
          </span>
        </div>
      </div>
    </Link>
  );
}