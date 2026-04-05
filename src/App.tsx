import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import Products from "./pages/Products.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminProducts from "./pages/admin/AdminProducts.tsx";
import AdminCategories from "./pages/admin/AdminCategories.tsx";
import AdminOrders from "./pages/admin/AdminOrders.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminInventory from "./pages/admin/AdminInventory.tsx";
import AdminPromotions from "./pages/admin/AdminPromotions.tsx";
import AdminRevenue from "./pages/admin/AdminRevenue.tsx";
import AdminBestsellers from "./pages/admin/AdminBestsellers.tsx";
import AdminReviews from "./pages/admin/AdminReviews.tsx";
import AdminBanners from "./pages/admin/AdminBanners.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
            <Route path="/admin/promotions" element={<AdminPromotions />} />
            <Route path="/admin/revenue" element={<AdminRevenue />} />
            <Route path="/admin/bestsellers" element={<AdminBestsellers />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/admin/banners" element={<AdminBanners />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
