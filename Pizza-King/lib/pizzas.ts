// lib/pizzas.ts
import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export type Pizza = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: "veg" | "non-veg" | "specialty";
  basePrice: number;
  isPopular?: boolean;
};

export async function getAllPizzas(): Promise<Pizza[]> {
  const snapshot = await getDocs(collection(db, "pizzas"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Pizza[];
}

export async function getPizzaById(id: string): Promise<Pizza | null> {
  const docRef = doc(db, "pizzas", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Pizza;
}

export async function addPizza(pizza: Omit<Pizza, "id">) {
  const docRef = await addDoc(collection(db, "pizzas"), pizza);
  return docRef.id;
}

export async function updatePizza(id: string, pizza: Partial<Pizza>) {
  const docRef = doc(db, "pizzas", id);
  await updateDoc(docRef, pizza);
}

export async function deletePizza(id: string) {
  const docRef = doc(db, "pizzas", id);
  await deleteDoc(docRef);
}