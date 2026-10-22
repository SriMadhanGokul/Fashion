import { useState } from "react";
import { Navigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { PRODUCTS } from "../data";
import { serif, inr } from "../utils/format";
import { useStore } from "../context/StoreContext";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";

export default function Account() {
  const { user, logout, orders, wishlist } = useStore();
  const [tab, setTab] = useState("orders");
  if (!user) return <Navigate to="/login" state={{ from: "/account" }} replace />;
  const mine = orders.filter((o) => o.email === user.email);
  const saved = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const tabCls = (t) => `border-b-2 px-1 pb-2 text-[13px] ${tab === t ? "border-[#b8934f] text-stone-900" : "border-transparent text-stone-500"}`;

  return (
    <Container className="py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#b8934f] text-[22px] text-white">{user.name[0].toUpperCase()}</span>
          <div><h1 className={`${serif} text-[30px] font-medium leading-none`}>{user.name}</h1><p className="text-[12px] text-stone-500">{user.email}</p></div>
        </div>
        <button onClick={logout} className="flex items-center gap-2 border border-stone-300 px-4 py-2 text-[11px] tracking-[0.15em]"><LogOut size={13} /> LOGOUT</button>
      </div>
      <div className="mb-6 flex gap-6 border-b border-[#eadfc9]">
        <button className={tabCls("orders")} onClick={() => setTab("orders")}>My Orders ({mine.length})</button>
        <button className={tabCls("wish")} onClick={() => setTab("wish")}>Wishlist ({saved.length})</button>
      </div>
      {tab === "orders" ? (
        mine.length ? (
          <div className="space-y-4">
            {mine.map((o) => (
              <div key={o.id} className="border border-[#eadfc9] p-4 text-[13px]">
                <div className="flex justify-between font-medium"><span>#{o.id}</span><span>{inr(o.total)}</span></div>
                <div className="text-[11px] text-stone-500">{new Date(o.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}</div>
                <ul className="mt-2 text-stone-600">{o.items.map((i) => <li key={i.key}>{i.qty} × {i.name} <span className="capitalize text-stone-400">({i.color}, {i.size})</span></li>)}</ul>
              </div>
            ))}
          </div>
        ) : <p className="py-10 text-center text-stone-500">No orders yet.</p>
      ) : saved.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{saved.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      ) : <p className="py-10 text-center text-stone-500">Tap the heart on any product to save it here.</p>}
    </Container>
  );
}
