// components/SizeSelector.tsx
type Size = "small" | "medium" | "large";

export default function SizeSelector({
  selected,
  onChange,
}: {
  selected: Size;
  onChange: (size: Size) => void;
}) {
  const sizes: { value: Size; label: string }[] = [
    { value: "small", label: "Small (9\")" },
    { value: "medium", label: "Medium (12\")" },
    { value: "large", label: "Large (15\")" },
  ];

  return (
    <div>
      <h3 className="font-semibold text-charcoal mb-3">Choose Size</h3>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => onChange(size.value)}
            className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
              selected === size.value
                ? "border-tomato bg-tomato/10 text-tomato"
                : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/30"
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}