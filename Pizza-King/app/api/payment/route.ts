import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Payment API is ready. Checkout currently processes cash on delivery.",
    paymentMethod: "cod",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json({
      ok: true,
      message: "Payment request accepted.",
      payment: body?.payment ?? "cod",
    });
  } catch (error) {
    console.error("Payment API error:", error);
    return NextResponse.json(
      { error: "Unable to process payment." },
      { status: 500 }
    );
  }
}
