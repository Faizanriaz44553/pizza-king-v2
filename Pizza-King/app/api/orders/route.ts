import { NextResponse } from "next/server";
import { createOrder, getAllOrders, updateOrderStatus, type NewOrder } from "@/lib/orders";

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders API error:", error);
    return NextResponse.json(
      { error: "Unable to fetch orders." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<NewOrder>;

    if (!body.name || !body.phone || !body.address || !body.city || !Array.isArray(body.items) || typeof body.total !== "number") {
      return NextResponse.json(
        { error: "Missing required order fields." },
        { status: 400 }
      );
    }

    const orderId = await createOrder({
      name: body.name,
      phone: body.phone,
      address: body.address,
      city: body.city,
      userEmail: body.userEmail,
      items: body.items,
      total: body.total,
      payment: body.payment ?? "cod",
    });

    return NextResponse.json({ orderId }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Unable to create order." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { id?: string; status?: string };

    if (!body.id || !body.status) {
      return NextResponse.json(
        { error: "Order id and status are required." },
        { status: 400 }
      );
    }

    await updateOrderStatus(body.id, body.status as "pending" | "preparing" | "out-for-delivery" | "delivered");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order status update error:", error);
    return NextResponse.json(
      { error: "Unable to update order status." },
      { status: 500 }
    );
  }
}
