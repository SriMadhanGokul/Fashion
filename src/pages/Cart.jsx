import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, CheckCircle2 } from "lucide-react";
import { getProduct, FREE_SHIP, SHIPPING, productImage } from "../data";
import { serif, inr } from "../utils/format";
import { useStore } from "../context/StoreContext";
import Container from "../components/common/Container";
import SmartImage from "../components/common/SmartImage";

export default function Cart() {
  const { cart, updateQty, removeItem, user, placeOrder } = useStore();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  if (order)
    return (
      <Container className="py-20 text-center">
        <CheckCircle2 size={48} className="mx-auto text-[#2f6f4a]" />
        <h1 className={`${serif} mt-4 text-[34px]`}>Thank you, your order is placed!</h1>
        <p className="mt-2 text-[13px] text-stone-600">Order <b>{order.id}</b> · Total {inr(order.total)}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/account" className="bg-[#1c1510] px-6 py-3 text-[10px] tracking-[0.2em] text-white">VIEW ORDERS</Link>
          <Link to="/" className="border border-[#1c1510] px-6 py-3 text-[10px] tracking-[0.2em]">CONTINUE SHOPPING</Link>
        </div>
      </Container>
    );

  if (!cart.length)
    return (
      <Container className="py-24 text-center">
        <h1 className={`${serif} text-[34px]`}>Your bag is empty</h1>
        <Link to="/shop/all" className="mt-6 inline-block bg-[#1c1510] px-6 py-3 text-[10px] tracking-[0.2em] text-white">START SHOPPING</Link>
      </Container>
    );

  const lines = cart.map((i) => ({ ...i, p: getProduct(i.id) }));
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIP ? 0 : SHIPPING;
  const checkout = () => {
    if (!user) return navigate("/login", { state: { from: "/cart" } });
    setOrder(placeOrder());
  };

  return (
    <Container className="py-10">
      <h1 className={`${serif} mb-6 text-[34px] font-medium`}>Your Bag</h1>
      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-[#eadfc9] border-y border-[#eadfc9]">
          {lines.map((l) => {
            const hex = l.p.colors.find((c) => c.name === l.color)?.hex;
            return (
              <li key={l.key} className="flex gap-4 py-4">
                <Link to={`/product/${l.id}`} className="h-28 w-[84px] flex-none overflow-hidden bg-stone-100">
                  <SmartImage
                    src={productImage(l.p)}
                    art={{ type: l.p.type, color: hex, seed: l.p.seed }}
                    alt={l.p.name}
                  />
                </Link>
                <div className="flex-1 text-[13px]">
                  <Link to={`/product/${l.id}`} className={`${serif} text-[17px] font-medium`}>{l.p.name}</Link>
                  <div className="mt-1 text-[11px] capitalize text-stone-500">{l.color} · {l.size}</div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center border border-stone-300 text-[13px]">
                      <button className="px-2.5 py-1" onClick={() => updateQty(l.key, l.qty - 1)}>−</button>
                      <span className="w-7 text-center">{l.qty}</span>
                      <button className="px-2.5 py-1" onClick={() => updateQty(l.key, l.qty + 1)}>+</button>
                    </div>
                    <button onClick={() => removeItem(l.key)} className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-red-700"><Trash2 size={13} /> Remove</button>
                  </div>
                </div>
                <div className={`${serif} text-[16px] font-semibold`}>{inr(l.p.price * l.qty)}</div>
              </li>
            );
          })}
        </ul>
        <aside className="h-fit border border-[#eadfc9] bg-[#f9f3e8] p-5 text-[13px]">
          <h2 className={`${serif} mb-3 text-[22px]`}>Order Summary</h2>
          <div className="flex justify-between py-1"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          <div className="flex justify-between py-1"><span>Shipping</span><span>{shipping ? inr(shipping) : "Free"}</span></div>
          {shipping > 0 && <p className="text-[11px] text-stone-500">Add {inr(FREE_SHIP - subtotal)} more for free shipping.</p>}
          <div className="mt-2 flex justify-between border-t border-[#e3d3b5] pt-3 text-[15px] font-semibold"><span>Total</span><span>{inr(subtotal + shipping)}</span></div>
          <button onClick={checkout} className="mt-5 w-full bg-[#1c1510] py-3 text-[11px] tracking-[0.2em] text-white hover:bg-black">{user ? "PLACE ORDER" : "LOGIN TO CHECKOUT"}</button>
        </aside>
      </div>
    </Container>
  );
}
