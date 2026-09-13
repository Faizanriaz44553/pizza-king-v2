// app/menu/page.tsx
"use client";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import { getAllPizzas, Pizza } from "@/lib/pizzas";
import PizzaCard from "@/components/PizzaCard";

const categories = [
  { label: "All", value: "all" },
  { label: "Veg", value: "veg" },
  { label: "Non-Veg", value: "non-veg" },
  { label: "Specialty", value: "specialty" },
];

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPizzas();
      setPizzas(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredPizzas = pizzas.filter((pizza) => {
    const matchesCategory =
      activeCategory === "all" || pizza.category === activeCategory;
    const matchesSearch = pizza.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto bg-black px-4 md:px-6 py-12 relative hero-gradient text-white overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <span className="text-black text-sm font-semibold uppercase tracking-wide">
          Full Menu
        </span>
        <h1 className="font-display font-700 text-4xl font-bold text-black mt-1">
          Pick Your Pizza
        </h1>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col  text-black  md:flex-row gap-4 md:items-center md:justify-between mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm   font-semibold transition-colors ${
                activeCategory === cat.value
                  ? "bg-tomato text-black"
                  : "bg-white text-charcoal hover:bg-charcoal"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search pizza..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 px-4 text-white bg-black  py-2 rounded-full border border-charcoal/15 outline-none focus:border-tomato text-sm"
        />
      </div>

      {/* Pizza grid */}
      {loading ? (
                <Loader />
      ) : filteredPizzas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20  bg-black ">
          No pizzas found. Try a different search or category.
        </div>
      )}
    </div>
  );
}