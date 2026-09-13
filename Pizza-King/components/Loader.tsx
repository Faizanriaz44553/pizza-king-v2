// components/Loader.tsx
export default function Loader({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "w-5 h-5 border-2",
    default: "w-8 h-8 border-[3px]",
    large: "w-12 h-12 border-4",
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div
        className={`${sizeClasses[size]} border-tomato/20 border-t-tomato rounded-full animate-spin`}
      />
    </div>
  );
}