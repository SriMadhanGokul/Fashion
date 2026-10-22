import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Heart, Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getProduct, PRODUCTS, CATEGORIES, productImage, slug } from "../data";
import { serif, inr } from "../utils/format";
import { useStore } from "../context/StoreContext";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import SmartImage from "../components/common/SmartImage";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { id } = useParams();
  const p = getProduct(id);
  const navigate = useNavigate();
  const { addToCart, toggleWish, wishlist } = useStore();
  const [color, setColor] = useState(p?.colors[0].name);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(productImage(p));

  useEffect(() => {
    if (!p) return;
    setColor(p.colors[0].name);
    setSize(p.sizes.includes("M") ? "M" : p.sizes[0]);
    setQty(1);
  }, [id]);

  useEffect(() => {
    if (!p) return;
    const def = productImage(p);
    if (!color) {
      setActiveImg(def);
      return;
    }
    const colorUrl = `/images/products/${p.category}__${slug(p.name)}__${slug(color)}.jpg`;
    const probe = new Image();
    probe.src = colorUrl;
    probe.onload = () => setActiveImg(colorUrl);
    probe.onerror = () => setActiveImg(def);
  }, [p, color]);

  if (!p) return <NotFound />;
  const hex = p.colors.find((c) => c.name === color)?.hex ?? p.colors[0].hex;
  const cat = CATEGORIES.find((c) => c.slug === p.category);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const liked = wishlist.includes(p.id);
  const opts = { color, size, qty };

  return (
    <Container className="py-8">
      <nav className="mb-5 text-[11px] text-stone-500">
        <Link to="/" className="hover:underline">Home</Link> / <Link to={`/shop/${cat.slug}`} className="hover:underline">{cat.name}</Link> / <span className="text-stone-800">{p.name}</span>
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="mx-auto aspect-[3/4] w-full max-w-[480px] overflow-hidden bg-stone-100 shadow-sm">
          <SmartImage
            src={activeImg}
            art={{ type: p.type, color: hex, seed: p.seed }}
            alt={p.name}
          />
        </div>
        <div>
          <h1 className={`${serif} text-[34px] font-medium leading-tight`}>{p.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-[12px] text-stone-600">
            <Star size={13} fill="#e8913a" stroke="none" /> {p.rating} · {p.reviews} reviews
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className={`${serif} text-[28px] font-semibold`}>{inr(p.price)}</span>
            <span className="text-[14px] text-stone-400 line-through">{inr(p.mrp)}</span>
            <span className="text-[12px] text-[#2f6f4a]">{Math.round((1 - p.price / p.mrp) * 100)}% off</span>
          </div>
          <p className="mt-4 max-w-[480px] text-[13px] leading-relaxed text-stone-600">{p.description}</p>

          <div className="mt-6 text-[12px]">
            <div className="mb-2">Colour: <b className="capitalize">{color}</b></div>
            <div className="flex gap-3">
              {p.colors.map((c) => (
                <button key={c.name} aria-label={c.name} onClick={() => setColor(c.name)} style={{ background: c.hex }}
                  className={`h-8 w-8 rounded-full ring-offset-2 ${color === c.name ? "ring-2 ring-stone-900" : "ring-1 ring-stone-300"}`} />
              ))}
            </div>
          </div>
          <div className="mt-5 text-[12px]">
            <div className="mb-2">Size: <b>{size}</b></div>
            <div className="flex gap-2">
              {p.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`min-w-[44px] border px-3 py-2 ${size === s ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 hover:border-stone-600"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3 text-[13px]">
            <div className="flex items-center border border-stone-300">
              <button className="px-3 py-2" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="w-8 text-center">{qty}</span>
              <button className="px-3 py-2" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button onClick={() => toggleWish(p.id)} aria-label="Wishlist" className="grid h-10 w-10 place-items-center border border-stone-300">
              <Heart size={17} fill={liked ? "#8a1f33" : "none"} className={liked ? "text-[#8a1f33]" : ""} />
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => addToCart(p.id, opts)} className="border border-[#1c1510] px-8 py-3 text-[11px] tracking-[0.2em] hover:bg-[#f5ede1]">ADD TO BAG</button>
            <button onClick={() => { addToCart(p.id, opts); navigate("/cart"); }} className="bg-[#1c1510] px-8 py-3 text-[11px] tracking-[0.2em] text-white hover:bg-black">BUY NOW</button>
          </div>
          <ul className="mt-8 space-y-2 text-[12px] text-stone-600">
            <li className="flex items-center gap-2"><Truck size={14} /> Free shipping on orders above ₹999</li>
            <li className="flex items-center gap-2"><RotateCcw size={14} /> Easy 7-day returns &amp; exchange</li>
            <li className="flex items-center gap-2"><ShieldCheck size={14} /> Premium quality, checked before dispatch</li>
          </ul>
        </div>
      </div>
      <h2 className={`${serif} mb-4 mt-14 text-[26px] font-medium`}>You may also like</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
    </Container>
  );
}
