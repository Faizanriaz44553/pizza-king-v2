// app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "firebase/auth";
import { subscribeToAuthChanges, isAdmin, logout } from "@/lib/auth";
import {
  LayoutDashboard,
  Pizza,
  ShoppingBag,
  LogOut,
  Flame,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Menu", href: "/admin/menu-manage", icon: Pizza },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser: User | null) => {
      if (currentUser && isAdmin(currentUser.email)) {
        setAuthorized(true);
        setUser(currentUser);
      } else {
        router.push("/");
      }
      setChecking(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-charcoal/50">
        Checking access...
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen flex">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 hero-gradient text-cream flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-cheese" />
          <span className="font-display font-700">Pizza King Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 hero-gradient text-cream z-40 transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
      >
        <div className="hidden md:flex items-center gap-2 px-6 h-16 border-b border-white/10">
          <Flame className="w-6 h-6 text-cheese" />
          <span className="font-display font-700 text-lg">Pizza King Admin</span>
        </div>

        <nav className="flex-1 px-4 py-6 mt-14 md:mt-0 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-tomato text-cream"
                    : "text-cream/70 hover:bg-white/80 hover:text-cream"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-white/10">
          <div className="px-4 mb-3">
            <p className="text-sm font-semibold truncate">{user?.displayName || "Admin"}</p>
            <p className="text-xs text-cream/50 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-cream/70 hover:bg-white/80 hover:text-cream transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 mt-14 md:mt-0 bg-cream min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}