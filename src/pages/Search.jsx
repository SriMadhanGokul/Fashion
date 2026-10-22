import { useSearchParams, Link } from "react-router-dom";
import { searchProducts } from "../data";
import { serif } from "../utils/format";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const items = searchProducts(q);
  return (
    <Container className="py-10">
      <h1 className={`${serif} text-[32px] font-medium`}>Results for “{q}”</h1>
      <p className="mb-6 text-[12px] text-stone-500">{items.length} products found</p>
      {items.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      ) : (
        <div className="py-16 text-center text-stone-500">
          Nothing matched. Try “saree”, “kurti”, “maroon” or “co-ord”.
          <div><Link to="/shop/all" className="mt-4 inline-block text-[#7a5a2e] underline">Browse all products</Link></div>
        </div>
      )}
    </Container>
  );
}
