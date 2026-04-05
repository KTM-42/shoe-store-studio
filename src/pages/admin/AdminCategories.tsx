import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { mockCategories, Category } from "@/data/adminData";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminCategories = () => {
  const [items, setItems] = useState<Category[]>(mockCategories);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "" });

  const handleSave = () => {
    if (!form.name) { toast.error("Vui lòng nhập tên danh mục!"); return; }
    if (editingId) {
      setItems((prev) => prev.map((c) => c.id === editingId ? { ...c, name: form.name, slug: form.slug || form.name.toLowerCase() } : c));
      toast.success("Đã cập nhật danh mục!");
    } else {
      setItems((prev) => [...prev, { id: Date.now().toString(), name: form.name, slug: form.slug || form.name.toLowerCase(), productCount: 0 }]);
      toast.success("Đã thêm danh mục!");
    }
    setShowForm(false); setEditingId(null); setForm({ name: "", slug: "" });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-bold">QUẢN LÝ DANH MỤC</h1>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: "", slug: "" }); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Thêm danh mục
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 mb-6 animate-slide-up">
          <h3 className="font-heading text-sm font-semibold mb-4">{editingId ? "SỬA DANH MỤC" : "THÊM DANH MỤC"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input placeholder="Tên danh mục" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input placeholder="Slug (tùy chọn)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">{editingId ? "Cập nhật" : "Thêm"}</button>
            <button onClick={() => setShowForm(false)} className="rounded-lg border border-border px-6 py-2 text-sm text-muted-foreground">Hủy</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((cat) => (
          <div key={cat.id} className="rounded-xl border border-border bg-card p-5 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.productCount} sản phẩm · /{cat.slug}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setEditingId(cat.id); setForm({ name: cat.name, slug: cat.slug }); setShowForm(true); }}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => { setItems((prev) => prev.filter((c) => c.id !== cat.id)); toast.success("Đã xóa!"); }}
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
