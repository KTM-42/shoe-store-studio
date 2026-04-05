import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { mockReviews, Review } from "@/data/adminData";
import { Star, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filter, setFilter] = useState("");

  const filtered = filter ? reviews.filter((r) => r.status === filter) : reviews;

  const updateStatus = (id: string, status: Review["status"]) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    toast.success(status === "approved" ? "Đã duyệt đánh giá!" : "Đã từ chối đánh giá!");
  };

  return (
    <AdminLayout>
      <h1 className="font-heading text-3xl font-bold mb-6">QUẢN LÝ ĐÁNH GIÁ</h1>

      <div className="flex gap-2 mb-6">
        {[{ label: "Tất cả", value: "" }, { label: "Chờ duyệt", value: "pending" }, { label: "Đã duyệt", value: "approved" }, { label: "Từ chối", value: "rejected" }].map((opt) => (
          <button key={opt.value} onClick={() => setFilter(opt.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${filter === opt.value ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>
            {opt.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((review) => (
          <div key={review.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium text-sm">{review.userName}</span>
                  <span className="text-xs text-muted-foreground">→ {review.productName}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    review.status === "approved" ? "bg-green-500/10 text-green-400" :
                    review.status === "rejected" ? "bg-red-500/10 text-red-400" :
                    "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {review.status === "approved" ? "Đã duyệt" : review.status === "rejected" ? "Từ chối" : "Chờ duyệt"}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <p className="text-xs text-muted-foreground mt-2">{review.createdAt}</p>
              </div>
              {review.status === "pending" && (
                <div className="flex gap-2 ml-4">
                  <button onClick={() => updateStatus(review.id, "approved")}
                    className="p-2 rounded-lg hover:bg-green-500/10 text-muted-foreground hover:text-green-400" title="Duyệt">
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button onClick={() => updateStatus(review.id, "rejected")}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400" title="Từ chối">
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminReviews;
