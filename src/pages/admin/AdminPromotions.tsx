import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { mockPromotions, Promotion } from "@/data/adminData";
import { formatPrice } from "@/data/products";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

const AdminPromotions = () => {
  const [promos, setPromos] = useState<Promotion[]>(mockPromotions);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ code: "", description: "", discountType: "percent" as "percent" | "fixed", discountValue: "", minOrder: "", maxUses: "", startDate: "", endDate: "" });

  const toggleActive = (id: string) => {
    setPromos((prev) => prev.map((p) => p.id === id ? { ...p, isActive: !p.isActive } : p));
    toast.success("Đã cập nhật!");
  };

  const handleSave = () => {
    if (!form.code || !form.discountValue) { toast.error("Vui lòng điền đầy đủ!"); return; }
    if (editingId) {
      setPromos((prev) => prev.map((p) => p.id === editingId ? { ...p, ...form, discountValue: Number(form.discountValue), minOrder: Number(form.minOrder), maxUses: Number(form.maxUses) } : p));
      toast.success("Đã cập nhật!");
    } else {
      setPromos((prev) => [...prev, { id: Date.now().toString(), ...form, discountValue: Number(form.discountValue), minOrder: Number(form.minOrder), maxUses: Number(form.maxUses), usedCount: 0, isActive: true }]);
      toast.success("Đã thêm mã khuyến mãi!");
    }
    setShowForm(false); setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl font-bold">KHUYẾN MÃI</h1>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ code: "", description: "", discountType: "percent", discountValue: "", minOrder: "", maxUses: "", startDate: "", endDate: "" }); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Thêm mã
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 mb-6 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input placeholder="Mã khuyến mãi" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input placeholder="Mô tả" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value as "percent" | "fixed" })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="percent">Giảm %</option>
              <option value="fixed">Giảm cố định (VND)</option>
            </select>
            <input placeholder="Giá trị giảm" type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input placeholder="Đơn hàng tối thiểu" type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input placeholder="Số lượt sử dụng tối đa" type="number" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="date" placeholder="Ngày bắt đầu" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="date" placeholder="Ngày kết thúc" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">{editingId ? "Cập nhật" : "Thêm"}</button>
            <button onClick={() => setShowForm(false)} className="rounded-lg border border-border px-6 py-2 text-sm text-muted-foreground">Hủy</button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-card border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Mã</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Mô tả</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Giảm</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Sử dụng</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Trạng thái</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((promo) => (
              <tr key={promo.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3 font-mono font-semibold text-primary">{promo.code}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{promo.description}</td>
                <td className="px-4 py-3">{promo.discountType === "percent" ? `${promo.discountValue}%` : formatPrice(promo.discountValue)}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{promo.usedCount}/{promo.maxUses}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${promo.isActive ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"}`}>
                    {promo.isActive ? "Hoạt động" : "Tắt"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => toggleActive(promo.id)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground">
                      {promo.isActive ? <ToggleRight className="h-4 w-4 text-green-400" /> : <ToggleLeft className="h-4 w-4" />}
                    </button>
                    <button onClick={() => { setPromos((prev) => prev.filter((p) => p.id !== promo.id)); toast.success("Đã xóa!"); }}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
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

export default AdminPromotions;
