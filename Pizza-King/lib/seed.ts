// lib/seed.ts
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const pizzas = [
  {
    name: "Margherita",
    description: "Classic tomato sauce, fresh mozzarella, basil leaves.",
    image: "/images/margherita.jpg",
    category: "veg",
    basePrice: 950,
    isPopular: true,
  },
  {
    name: "Pepperoni Feast",
    description: "Loaded pepperoni, mozzarella, tangy tomato base.",
    image: "/images/pepperoni.jpg",
    category: "non-veg",
    basePrice: 1250,
    isPopular: true,
  },
  {
    name: "BBQ Chicken",
    description: "Smoky BBQ sauce, grilled chicken, red onions, cheese.",
    image: "/images/bbq-chicken.jpg",
    category: "non-veg",
    basePrice: 1350,
    isPopular: true,
  },
  {
    name: "Veggie Supreme",
    description: "Bell peppers, olives, mushrooms, onions, sweet corn.",
    image: "/images/veggie-supreme.jpg",
    category: "veg",
    basePrice: 1100,
    isPopular: false,
  },
  {
    name: "Four Cheese",
    description: "Mozzarella, cheddar, parmesan, and blue cheese blend.",
    image: "/images/four-cheese.jpg",
    category: "specialty",
    basePrice: 1400,
    isPopular: false,
  },
  {
    name: "Chicken Fajita",
    description: "Spicy fajita chicken, peppers, onions, jalapeños.",
    image: "/images/fajita.jpg",
    category: "non-veg",
    basePrice: 1300,
    isPopular: false,
  },
];

export async function seedPizzas() {
  const pizzasRef = collection(db, "pizzas");
  for (const pizza of pizzas) {
    await addDoc(pizzasRef, pizza);
    console.log(`Added: ${pizza.name}`);
  }
  console.log("Seeding complete!");
}