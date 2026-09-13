// app/about/page.tsx
import Image from "next/image";
import { Flame, Leaf, Clock, Award } from "lucide-react";

const values = [
  {
    icon: Flame,
    title: "Wood-Fired Always",
    description: "Every pizza baked in a real wood-fired oven at 450°C, the way it's meant to be.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Dough made fresh daily, real mozzarella, and sauces from scratch — no shortcuts.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Hot pizza at your door in 30 minutes or less, guaranteed across the city.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "Every pie checked before it leaves our kitchen. If it's not perfect, we remake it.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-charcoal text-cream">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-20 text-center">
          <span className="text-cheese text-sm font-semibold uppercase tracking-wide">
            Our Story
          </span>
          <h1 className="font-display font-900 text-4xl md:text-5xl mt-3">
            From a small kitchen to your doorstep
          </h1>
          <p className="text-cream/70 mt-5 max-w-2xl mx-auto text-lg">
            Pizza King started with one wood-fired oven and a simple idea: pizza
            should taste like someone actually cared about making it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-cheese/10">
          <Image
            src="/images/hero-pizza.jpg"
            alt="Our kitchen"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-display font-700 text-3xl text-charcoal mb-4">
            Why we do this
          </h2>
          <p className="text-charcoal/70 leading-relaxed">
            We started Pizza King because we were tired of pizza that tasted like
            it came out of a box. Every pie we make starts with dough proofed
            for 24 hours, sauce simmered from real tomatoes, and cheese that
            actually melts the way it should.
          </p>
          <p className="text-charcoal/70 leading-relaxed mt-4">
            Today, we deliver across the city, but the process hasn't
            changed — hand-stretched, wood-fired, and out the door within
            minutes of coming out of the oven.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cheese/10 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="font-display font-700 text-3xl text-charcoal text-center mb-10">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 text-center border border-charcoal/10"
              >
                <value.icon className="w-8 h-8 text-tomato mx-auto mb-4" />
                <h3 className="font-display font-600 text-lg text-charcoal mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-charcoal/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}