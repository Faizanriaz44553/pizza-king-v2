// lib/orders.ts

import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export type OrderStatus =
  | "pending"
  | "preparing"
  | "out-for-delivery"
  | "delivered";

export type OrderItem = {
  name: string;
  size: string;
  quantity: number;
  price: number;
};

// Data required when creating a new order
export type NewOrder = {
  name: string;
  phone: string;
  address: string;
  city: string;
  userEmail?: string;
  items: OrderItem[];
  total: number;
  payment: string;
};

// Complete order stored in Firestore
export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  userEmail?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  payment: string;
  createdAt: any;
};

export async function createOrder(order: NewOrder): Promise<string> {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getAllOrders(): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
) {
  const docRef = doc(db, "orders", id);

  await updateDoc(docRef, {
    status,
  });
}