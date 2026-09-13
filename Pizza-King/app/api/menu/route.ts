import { NextResponse } from "next/server";
import { getAllPizzas } from "@/lib/pizzas";

export async function GET() {
  try {
    const pizzas = await getAllPizzas();
    return NextResponse.json({ pizzas });
  } catch (error) {
    console.error("Menu API error:", error);
    return NextResponse.json(
      { error: "Unable to fetch pizzas." },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { message: "Menu updates are handled in the admin dashboard." },
    { status: 405 }
  );
}
