// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, Flame, User as UserIcon } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { subscribeToAuthChanges, logout } from "@/lib/auth";
import { User } from "firebase/auth";

const navLinks = [
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 hero-gradient text-cream border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Flame className="w-6 h-6 text-cheese group-hover:text-tomato transition-colors" />
          <span className="font-display font-700 text-xl tracking-tight">
            Pizza King<span className="text-tomato">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wide text-cream/80 hover:text-cheese transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/80 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-tomato text-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/account"
                className="flex items-center gap-2 text-sm font-semibold hover:text-cheese transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                {user.displayName?.split(" ")[0] || "Account"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-full border border-cream/30 hover:border-tomato hover:text-tomato transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden md:inline-block text-sm px-4 py-2 rounded-full bg-cheese text-charcoal font-semibold hover:bg-cheese/90 transition-colors"
            >
              Login
            </Link>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-charcoal border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-wide text-cream/80 hover:text-cheese"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="text-sm px-4 py-2 rounded-full bg-cheese text-charcoal font-semibold text-center"
              >
                {user.displayName || "My Account"}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="text-sm px-4 py-2 rounded-full border border-cream/30 text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-sm px-4 py-2 rounded-full bg-cheese text-charcoal font-semibold text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}