// app/admin/menu-manage/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  getAllPizzas,
  addPizza,
  updatePizza,
  deletePizza,
  Pizza,
} from "@/lib/pizzas";
import { formatPrice } from "@/lib/utils";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const emptyForm = {
  name: "",
  description: "",
  image: "",
  category: "veg" as Pizza["category"],
  basePrice: 0,
  isPopular: false,
};

export default function MenuManagePage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchPizzas = async () => {
    setLoading(true);
    const data = await getAllPizzas();
    setPizzas(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  };

  const handleEdit = (pizza: Pizza) => {
    setForm({
      name: pizza.name,
      description: pizza.description,
      image: pizza.image,
      category: pizza.category,
      basePrice: pizza.basePrice,
      isPopular: pizza.isPopular || false,
    });
    setEditingId(pizza.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this pizza?")) return;
    await deletePizza(id);
    fetchPizzas();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updatePizza(editingId, form);
      } else {
        await addPizza(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchPizzas();
    } catch (err) {
      console.error(err);
      alert("Error saving pizza — check console.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-700 text-3xl text-charcoal">
          Manage Menu
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-tomato hover:bg-tomatoDark transition-colors text-cream px-5 py-2.5 rounded-full font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Add Pizza
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-700 text-xl text-charcoal">
                {editingId ? "Edit Pizza" : "Add New Pizza"}
              </h2>
              <button onClick={handleCancel}>
                <X className="w-5 h-5 text-charcoal/50" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-charcoal">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-charcoal/15 outline-none focus:border-tomato"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-charcoal">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-charcoal/15 outline-none focus:border-tomato resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-charcoal">Image Path</label>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="/images/example.jpg"
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-charcoal/15 outline-none focus:border-tomato"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-charcoal">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-charcoal/15 outline-none focus:border-tomato bg-white"
                  >
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                    <option value="specialty">Specialty</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-charcoal">Base Price</label>
                  <input
                    type="number"
                    name="basePrice"
                    value={form.basePrice}
                    onChange={handleChange}
                    required
                    min={0}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-charcoal/15 outline-none focus:border-tomato"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={form.isPopular}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Mark as Popular
              </label>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-tomato hover:bg-tomatoDark disabled:opacity-60 transition-colors text-cream font-semibold py-3 rounded-full"
              >
                {saving ? "Saving..." : editingId ? "Update Pizza" : "Add Pizza"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Pizza List */}
      {loading ? (
        <div className="text-center py-16 text-charcoal/50">Loading...</div>
      ) : (
        <div className="space-y-3">
          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="flex items-center justify-between bg-white border border-charcoal/10 rounded-xl p-4"
            >
              <div>
                <h3 className="font-semibold text-charcoal">{pizza.name}</h3>
                <p className="text-sm text-charcoal/50">
                  {pizza.category} • {formatPrice(pizza.basePrice)}
                  {pizza.isPopular && " • ⭐ Popular"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(pizza)}
                  className="p-2 rounded-lg hover:bg-cheese/10 text-charcoal/60 hover:text-tomato transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(pizza.id)}
                  className="p-2 rounded-lg hover:bg-tomato/10 text-charcoal/60 hover:text-tomato transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}