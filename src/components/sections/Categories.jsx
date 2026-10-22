import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import { CATEGORIES } from "../../data";
import { serif } from "../../utils/format";
import Container from "../common/Container";
import ViewAll from "../common/ViewAll";
import SmartImage from "../common/SmartImage";

const Categories = () => (
  <section className="py-10">
    <Container>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div className="flex flex-wrap items-end gap-6">
          <h2 className={`${serif} text-[26px] font-medium text-stone-900`}>Shop by Category</h2>
          <p className="pb-1 text-[10px] text-stone-500">Explore our exclusive collections crafted for every occasion.</p>
        </div>
        <ViewAll to="/shop/all">View All Categories</ViewAll>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {CATEGORIES.map((c, i) => (
          <Link key={c.slug} to={`/shop/${c.slug}`} className="group relative aspect-[3/4] overflow-hidden bg-stone-100 md:aspect-[4/5]">
            <SmartImage
              src={c.image}
              art={{ type: c.type, color: c.color, seed: i }}
              alt={c.name}
              className="transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <div className={`${serif} text-[19px] font-medium`}>{c.name}</div>
              <div className="flex items-center gap-1.5 text-[10px] text-stone-200">Explore Now <ArrowRight size={11} /></div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  </section>
);

export default Categories;
