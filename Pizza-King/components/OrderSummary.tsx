// components/OrderSummary.tsx
import { formatPrice } from "@/lib/utils";

export default function OrderSummary({
  subtotal,
  deliveryFee = 150,
  buttonText = "Proceed to Checkout",
  onSubmit,
  disabled = false,
}: {
  subtotal: number;
  deliveryFee?: number;
  buttonText?: string;
  onSubmit?: () => void;
  disabled?: boolean;
}) {
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

  return (
    <div className="bg-cream border border-charcoal/10 rounded-2xl p-6 sticky top-24">
      <h3 className="font-display font-700 text-lg text-charcoal mb-4">
        Order Summary
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-charcoal/70">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-charcoal/70">
          <span>Delivery Fee</span>
          <span>{subtotal > 0 ? formatPrice(deliveryFee) : "—"}</span>
        </div>
      </div>

      <div className="border-t border-charcoal/10 mt-4 pt-4 flex justify-between font-semibold text-charcoal">
        <span>Total</span>
        <span className="text-tomato text-lg">{formatPrice(total)}</span>
      </div>

      <button
        onClick={onSubmit}
        disabled={disabled || subtotal === 0}
        className="w-full mt-6 bg-tomato hover:bg-tomatoDark disabled:bg-charcoal/20 disabled:cursor-not-allowed transition-colors text-cream font-semibold py-3.5 rounded-full"
      >
        {buttonText}
      </button>
    </div>
  );
}