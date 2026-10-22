import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";

const Toast = () => {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-[#1c1510] px-4 py-3 text-[12px] text-white shadow-xl">
      <Check size={14} className="text-[#d4af6a]" /> {toast.msg}
      {toast.link && <Link to="/cart" className="ml-2 text-[#d4af6a] underline">View bag</Link>}
    </div>
  );
};

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen bg-[#fdfaf5] font-sans text-stone-800 antialiased">
      <TopBar />
      <Header />
      <Outlet />
      <Footer />
      <Toast />
    </div>
  );
}
