import { serif } from "../../utils/format";
import Container from "../common/Container";
import ViewAll from "../common/ViewAll";
import ProductCard from "../common/ProductCard";

const ProductSection = ({ eyebrow, title, blurb, items, to = "/shop/all", link = "View All Products" }) => (
  <section className="py-6">
    <Container>
      <p className="text-[9px] tracking-[0.3em] text-stone-500">{eyebrow.toUpperCase()}</p>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 className={`${serif} text-[28px] font-medium text-stone-900`}>{title}</h2>
        <div className="flex items-end gap-10">
          {blurb && <p className="hidden max-w-[260px] text-[10px] leading-snug text-stone-500 md:block">{blurb}</p>}
          <ViewAll to={to}>{link}</ViewAll>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </Container>
  </section>
);

export default ProductSection;
