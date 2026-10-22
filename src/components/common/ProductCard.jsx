import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { serif, inr } from "../../utils/format";
import { useStore } from "../../context/StoreContext";
import { productImage } from "../../data";
import SmartImage from "./SmartImage";

const ProductCard = ({ p }) => {
  const { addToCart, toggleWish, wishlist } = useStore();
  const liked = wishlist.includes(p.id);
  return (
    <div className="group">
      <Link to={`/product/${p.id}`} className="relative block aspect-[3/4] overflow-hidden bg-stone-100">
        <SmartImage
          src={productImage(p)}
          art={{ type: p.type, color: p.colors[0]?.hex, seed: p.seed }}
          alt={p.name}
          className="transition duration-500 group-hover:scale-105"
        />
        <button
          aria-label="Toggle wishlist"
          onClick={(e) => { e.preventDefault(); toggleWish(p.id); }}
          className="absolute right-3 top-3 text-stone-800"
        >
          <Heart size={17} strokeWidth={1.4} fill={liked ? "#8a1f33" : "none"} className={liked ? "text-[#8a1f33]" : ""} />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); addToCart(p.id); }}
          className="absolute inset-x-0 bottom-0 translate-y-0 bg-[#1c1510]/90 py-2 text-[10px] tracking-[0.2em] text-white transition md:translate-y-full md:group-hover:translate-y-0"
        >
          ADD TO BAG
        </button>
      </Link>
      <Link to={`/product/${p.id}`} className={`${serif} mt-2 block text-[14px] font-medium text-stone-900 hover:text-[#7a5a2e]`}>{p.name}</Link>
      <div className={`${serif} text-[14px] font-semibold text-stone-800`}>{inr(p.price)}</div>
      <div className="mt-2 flex gap-2">
        {p.colors.map((c) => <span key={c.name} title={c.name} className="h-4 w-4 rounded-full" style={{ background: c.hex }} />)}
      </div>
    </div>
  );
};

export default ProductCard;
