// components/Footer.tsx
import Link from "next/link";
import { Flame,  Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 mt-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-cheese" />
            <span className="font-display font-700 text-lg text-cream">
              Pizza King<span className="text-tomato">.</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Hand-stretched dough, wood-fired daily. No shortcuts, just pizza
            done right.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <Link href="#" className="hover:text-cheese transition-colors">
              <Flame className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-cheese transition-colors">
              <Flame className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-cream font-semibold mb-3 text-sm uppercase tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/menu" className="hover:text-cheese transition-colors">Menu</Link></li>
            <li><Link href="/about" className="hover:text-cheese transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-cheese transition-colors">Contact</Link></li>
            <li><Link href="/track-order" className="hover:text-cheese transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-cream font-semibold mb-3 text-sm uppercase tracking-wide">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-cheese" />
              <span>Shahrah-e-Faisal, Karachi, Pakistan</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0 text-cheese" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0 text-cheese" />
              <span>Daily: 12:00 PM – 12:00 AM</span>
            </li>
          </ul>
        </div>

        {/* Newsletter (static for now) */}
        <div>
          <h4 className="text-cream font-semibold mb-3 text-sm uppercase tracking-wide">
            Get Offers
          </h4>
          <p className="text-sm mb-3">Subscribe for deals & new menu drops.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-l-md bg-white/80 text-sm text-cream placeholder:text-cream/40 outline-none"
            />
            <button className="px-4 py-2 rounded-r-md bg-tomato text-cream text-sm font-semibold hover:bg-tomatoDark transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Pizza King Pizza. All rights reserved.
      </div>
    </footer>
  );
}