// components/ToppingsSelector.tsx
import { availableToppings } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function ToppingsSelector({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="font-semibold text-charcoal mb-3">Add Toppings</h3>
      <div className="grid grid-cols-2 gap-3">
        {availableToppings.map((topping) => {
          const isSelected = selected.includes(topping.id);
          return (
            <button
              key={topping.id}
              onClick={() => onToggle(topping.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-colors ${
                isSelected
                  ? "border-basil bg-basil/10 text-basil"
                  : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/30"
              }`}
            >
              <span>{topping.name}</span>
              <span className="font-semibold">+{formatPrice(topping.price)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}