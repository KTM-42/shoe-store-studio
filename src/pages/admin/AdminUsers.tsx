import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { mockUsers, AdminUser } from "@/data/adminData";
import { formatPrice } from "@/data/products";
import { Search, Ban, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u));
    toast.success("Đã cập nhật trạng thái người dùng!");
  };

  return (
    <AdminLayout>
      <h1 className="font-heading text-3xl font-bold mb-6">QUẢN LÝ NGƯỜI DÙNG</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Tìm người dùng..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-card border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Người dùng</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">SĐT</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Đơn hàng</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Tổng chi</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Trạng thái</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{user.phone}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{user.totalOrders}</td>
                <td className="px-4 py-3 font-medium text-primary">{formatPrice(user.totalSpent)}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${user.status === "active" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                    {user.status === "active" ? "Hoạt động" : "Đã chặn"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => toggleStatus(user.id)}
                    className={`p-2 rounded-lg hover:bg-secondary ${user.status === "active" ? "text-muted-foreground hover:text-red-400" : "text-muted-foreground hover:text-green-400"}`}
                    title={user.status === "active" ? "Chặn" : "Mở chặn"}>
                    {user.status === "active" ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
