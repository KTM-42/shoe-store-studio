import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { products, formatPrice, Product } from "@/data/products";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

const AdminProducts = () => {
  const [items, setItems] = useState<Product[]>(products);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", brand: "", price: "", category: "", description: "" });

  const filtered = items.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    toast.success("Đã xóa sản phẩm!");
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({ name: product.name, brand: product.brand, price: product.price.toString(), category: product.category, description: product.description });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.brand || !form.price) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (editingId) {
      setItems((prev) => prev.map((p) => p.id === editingId ? { ...p, name: form.name, brand: form.brand, price: Number(form.price), category: form.category, description: form.description } : p));
      toast.success("Đã cập nhật sản phẩm!");
    } else {
      const newProduct: Product = {
        id: Date.now().toString(), name: form.name, brand: form.brand, price: Number(form.price),
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"],
        sizes: [39, 40, 41, 42, 43], category: form.category, description: form.description, rating: 0, reviews: 0,
      };
      setItems((prev) => [...prev, newProduct]);
      toast.success("Đã thêm sản phẩm mới!");
    }
    setShowForm(false);
    setEditingId(null);
    setForm({ name: "", brand: "", price: "", category: "", description: "" });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-bold">QUẢN LÝ SẢN PHẨM</h1>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: "", brand: "", price: "", category: "", description: "" }); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Thêm sản phẩm
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 mb-6 animate-slide-up">
          <h3 className="font-heading text-sm font-semibold mb-4">{editingId ? "SỬA SẢN PHẨM" : "THÊM SẢN PHẨM MỚI"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input placeholder="Tên sản phẩm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input placeholder="Thương hiệu" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input placeholder="Giá (VND)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Chọn danh mục</option>
              <option value="Running">Running</option>
              <option value="Basketball">Basketball</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Training">Training</option>
            </select>
          </div>
          <textarea placeholder="Mô tả sản phẩm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary" rows={3} />
          <div className="flex gap-3">
            <button onClick={handleSave} className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              {editingId ? "Cập nhật" : "Thêm"}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); }}
              className="rounded-lg border border-border px-6 py-2 text-sm text-muted-foreground hover:text-foreground">Hủy</button>
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Tìm sản phẩm..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-card border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Sản phẩm</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Thương hiệu</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Giá</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Danh mục</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{product.brand}</td>
                <td className="px-4 py-3 font-medium text-primary">{formatPrice(product.price)}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{product.category}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(product)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
