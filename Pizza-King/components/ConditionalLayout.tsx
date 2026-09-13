// components/ConditionalLayout.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { subscribeToAuthChanges, isAdmin } from "@/lib/auth";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const onAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Agar user admin hai aur admin route pe nahi hai, to wapis /admin bhej den
    if (user && isAdmin(user.email) && !onAdminRoute) {
      router.replace("/admin");
    }
  }, [user, onAdminRoute, router]);

  // Jab tak auth state check nahi ho jati, ya jab admin ko redirect hona hai,
  // kuch bhi na dikhayen taake customer UI ka flash na dikhe
  if (user === undefined) {
    return null;
  }

  if (user && isAdmin(user.email) && !onAdminRoute) {
    return null;
  }

  if (onAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}