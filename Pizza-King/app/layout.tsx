// app/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Pizza King Pizza — Wood-Fired, Fresh Daily",
  description: "Hand-stretched, wood-fired pizza. Order online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} font-body bg-cream text-charcoal`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}