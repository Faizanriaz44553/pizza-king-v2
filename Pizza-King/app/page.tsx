// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPizzas, Pizza } from "@/lib/pizzas";
import PizzaCard from "@/components/PizzaCard";
import { Flame, Truck, Clock } from "lucide-react";

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPizzas();
      setPizzas(data);
    }
    fetchData();
  }, []);

  const popular = pizzas.filter((p) => p.isPopular);

  return (
    <div>
      {/* Hero Section */}
     <section className="relative hero-gradient text-cream overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-cheese text-sm font-semibold uppercase tracking-wide mb-4">
              <Flame className="w-4 h-4" /> Wood-fired since day one
            </span>
            <h1 className="font-display font-900 text-4xl md:text-6xl leading-tight">
              Pizza that tastes like{" "}
              <span className="warm-gradient-text">it should.</span>
            </h1>
            <p className="text-cream/70 mt-5 text-lg max-w-md">
              Hand-stretched dough, real mozzarella, and a wood-fired oven
              that doesn't cut corners. Ordered in minutes, at your door hot.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/menu"
                className="bg-tomato hover:bg-tomatoDark transition-colors px-6 py-3 rounded-full font-semibold"
              >
                Order Now
              </Link>
              <Link
                href="/about"
                className="border border-cream/30 hover:border-cheese hover:text-cheese transition-colors px-6 py-3 rounded-full font-semibold"
              >
                Our Story
              </Link>
            </div>
          </div>

          <div className="relative w-full aspect-square">
            <Image
              src="/images/hero-pizza.jpg"
              alt="Wood-fired pizza"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-cheese/10 border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-wrap justify-around gap-6 text-sm text-charcoal">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-tomato" />
            30-min delivery
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-tomato" />
            Wood-fired oven
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-tomato" />
            Open till midnight
          </div>
        </div>
      </section>

      {/* Popular pizzas */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-tomato text-sm font-semibold uppercase tracking-wide">
              Fan favorites
            </span>
            <h2 className="font-display font-700 text-3xl text-charcoal mt-1">
              Most Ordered Pizzas
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-sm font-semibold text-tomato hover:underline hidden sm:block"
          >
            View Full Menu →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </section>
    </div>
  );
}