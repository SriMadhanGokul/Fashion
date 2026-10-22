import Hero from "../components/sections/Hero";
import Categories from "../components/sections/Categories";
import ProductSection from "../components/sections/ProductSection";
import FestiveBanner from "../components/sections/FestiveBanner";
import Testimonials from "../components/sections/Testimonials";
import Newsletter from "../components/sections/Newsletter";
import { NEW_ARRIVALS, FEATURED } from "../data";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <ProductSection eyebrow="New Arrivals" title="The Latest, Curated for Her" to="/shop/new-arrivals"
        blurb="Handpicked styles that blend tradition with contemporary charm — because every woman deserves to feel extraordinary."
        items={NEW_ARRIVALS} />
      <FestiveBanner />
      <ProductSection eyebrow="Featured Collection" title="Elegant Picks for Every Occasion" items={FEATURED} />
      <Testimonials />
      <Newsletter />
    </>
  );
}
