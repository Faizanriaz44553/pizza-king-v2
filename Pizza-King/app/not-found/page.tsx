// app/not-found.tsx
import Link from "next/link";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <Flame className="w-14 h-14 text-tomato mx-auto mb-5" />
      <h1 className="font-display font-900 text-5xl text-charcoal">404</h1>
      <p className="text-charcoal/60 mt-3">
        Looks like this page got lost on the way to the oven.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 bg-tomato hover:bg-tomatoDark transition-colors text-cream font-semibold px-6 py-3 rounded-full"
      >
        Back to Home
      </Link>
    </div>
  );
}