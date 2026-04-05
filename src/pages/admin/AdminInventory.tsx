import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { products } from "@/data/products";
import { toast } from "sonner";

interface InventoryItem {
  productId: string;
  name: string;
  brand: string;
  sizes: { size: number; stock: number }[];
}

const initialInventory: InventoryItem[] = products.map((p) => ({
  productId: p.id, name: p.name, brand: p.brand,
  sizes: p.sizes.map((s) => ({ size: s, stock: Math.floor(Math.random() * 30) + 5 })),
}));

const AdminInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

  const updateStock = (productId: string, size: number, stock: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, sizes: item.sizes.map((s) => (s.size === size ? { ...s, stock: Math.max(0, stock) } : s)) }
          : item
      )
    );
  };

  return (
    <AdminLayout>
      <h1 className="font-heading text-3xl font-bold mb-6">QUẢN LÝ KHO HÀNG</h1>

      <div className="space-y-4">
        {inventory.map((item) => {
          const totalStock = item.sizes.reduce((sum, s) => sum + s.stock, 0);
          return (
            <div key={item.productId} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading font-semibold">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.brand} · Tổng tồn kho: <span className={totalStock < 20 ? "text-red-400" : "text-green-400"}>{totalStock}</span></p>
                </div>
                <button onClick={() => { toast.success(`Đã lưu kho cho ${item.name}`); }}
                  className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Lưu</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {item.sizes.map((s) => (
                  <div key={s.size} className="flex items-center gap-2 rounded-lg border border-border p-2">
                    <span className="text-xs text-muted-foreground w-8">Size {s.size}</span>
                    <input type="number" value={s.stock} onChange={(e) => updateStock(item.productId, s.size, Number(e.target.value))}
                      className={`w-16 rounded border border-border bg-background px-2 py-1 text-xs text-center focus:outline-none focus:ring-1 focus:ring-primary ${s.stock < 5 ? "text-red-400" : ""}`} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminInventory;
