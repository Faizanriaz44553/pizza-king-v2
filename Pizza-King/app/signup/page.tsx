// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(form.name, form.email, form.password);
      router.push("/");
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-display font-700 text-3xl text-charcoal mb-2">
        Create Account
      </h1>
      <p className="text-charcoal/60 mb-8">
        Sign up to order and track your pizzas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-charcoal">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-charcoal">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-charcoal">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full mt-1 px-4 py-3 rounded-xl border border-charcoal/15 outline-none focus:border-tomato"
          />
        </div>

        {error && <p className="text-tomato text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-tomato hover:bg-tomatoDark disabled:opacity-60 transition-colors text-cream font-semibold py-3.5 rounded-full"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm text-charcoal/60 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-tomato font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}