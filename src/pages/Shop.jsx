import { useState } from "react";
import { useParams } from "react-router-dom";
import { PRODUCTS, CATEGORIES, COLORS } from "../data";
import { serif } from "../utils/format";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import SmartImage from "../components/common/SmartImage";
import NotFound from "./NotFound";

const RANGES = [["All prices", 0, 1e9], ["Under ₹1,500", 0, 1499], ["₹1,500 – ₹2,500", 1500, 2500], ["Above ₹2,500", 2501, 1e9]];

export default function Shop() {
  const { slug } = useParams();
  const [sort, setSort] = useState("featured");
  const [range, setRange] = useState(0);
  const [color, setColor] = useState("");

  const cat = CATEGORIES.find((c) => c.slug === slug);
  const special = { "new-arrivals": "New Arrivals", all: "All Products" }[slug];
  if (!cat && !special) return <NotFound />;

  let items = PRODUCTS.filter((p) => (slug === "all" ? true : slug === "new-arrivals" ? p.isNew : p.category === slug));
  const available = [...new Set(items.flatMap((p) => p.colors.map((c) => c.name)))];
  items = items.filter((p) => p.price >= RANGES[range][1] && p.price <= RANGES[range][2] && (!color || p.colors.some((c) => c.name === color)));
  if (sort === "low") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "high") items = [...items].sort((a, b) => b.price - a.price);
  if (sort === "rating") items = [...items].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <section className="relative h-[190px] overflow-hidden text-white">
        <div className="absolute inset-0">
          <SmartImage
            src={cat?.image || "/images/banners/hero-1.jpg"}
            art={{ wide: true, type: cat?.type || "saree", color: cat?.color || "#7a1f2b", seed: cat ? CATEGORIES.indexOf(cat) : 0 }}
            alt={cat?.name || special}
            className="object-[center_30%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a1c10]/95 via-[#2a1c10]/60 to-transparent" />
        <Container className="relative z-10 flex h-full flex-col justify-center">
          <p className="text-[10px] tracking-[0.3em] text-[#d9c7a3]">COLLECTION</p>
          <h1 className={`${serif} text-[40px] font-medium`}>{cat?.name || special}</h1>
          <p className="text-[12px] text-[#e9dcc2]">{cat?.blurb || "Handpicked styles, curated for her."}</p>
        </Container>
      </section>

      <Container className="py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-[12px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-500">{items.length} products</span>
            <button onClick={() => setColor("")} className={`rounded-full border px-3 py-1 ${!color ? "border-stone-800 bg-stone-800 text-white" : "border-stone-300"}`}>All colours</button>
            {available.map((c) => (
              <button key={c} title={c} aria-label={c} onClick={() => setColor(c)} style={{ background: COLORS[c] }}
                className={`h-6 w-6 rounded-full border-2 ${color === c ? "border-stone-900" : "border-white shadow"}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <select value={range} onChange={(e) => setRange(+e.target.value)} className="border border-stone-300 bg-transparent px-2 py-1.5">
              {RANGES.map((r, i) => <option key={r[0]} value={i}>{r[0]}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-stone-300 bg-transparent px-2 py-1.5">
              <option value="featured">Featured</option><option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option><option value="rating">Top rated</option>
            </select>
          </div>
        </div>
        {items.length ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : (
          <p className="py-16 text-center text-stone-500">No products match these filters.</p>
        )}
      </Container>
    </>
  );
}
