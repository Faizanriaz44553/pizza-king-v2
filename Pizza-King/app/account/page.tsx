// app/account/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "firebase/auth";
import { subscribeToAuthChanges, logout } from "@/lib/auth";
import { User as UserIcon, Package, LogOut } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-charcoal/50">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-16">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-tomato/10 flex items-center justify-center">
          <UserIcon className="w-8 h-8 text-tomato" />
        </div>
        <div>
          <h1 className="font-display font-700 text-2xl text-charcoal">
            {user.displayName || "Pizza Lover"}
          </h1>
          <p className="text-charcoal/60 text-sm">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/account/orders"
          className="flex items-center justify-between p-4 rounded-xl border border-charcoal/10 hover:border-tomato/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-tomato" />
            <span className="font-semibold text-charcoal">My Orders</span>
          </div>
          <span className="text-charcoal/40">→</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 rounded-xl border border-charcoal/10 hover:border-tomato/40 transition-colors text-left"
        >
          <LogOut className="w-5 h-5 text-tomato" />
          <span className="font-semibold text-charcoal">Logout</span>
        </button>
      </div>
    </div>
  );
}