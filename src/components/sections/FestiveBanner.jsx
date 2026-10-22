import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { serif } from "../../utils/format";
import Container from "../common/Container";
import SmartImage from "../common/SmartImage";

const FestiveBanner = () => (
  <section className="relative my-8 h-[200px] overflow-hidden">
    <div className="absolute inset-0">
      <SmartImage
        src="/images/banners/festive-banner.jpg"
        art={{ wide: true, type: "ethnic", color: "#7a1f2b", seed: 1 }}
        alt="Festive moments"
        className="object-[center_30%]"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-[#f0dfbf]/95 via-[#f0dfbf]/80 to-transparent" />
    <Container className="relative z-10 flex h-full items-center justify-between">
      <div>
        <h2 className={`${serif} text-[36px] font-medium leading-[1.05] text-stone-900`}>Made for Moments<br />That Matter</h2>
        <p className="mt-2 text-[11px] text-stone-700">Graceful styles for your celebrations, festivities and every special you.</p>
        <Link to="/shop/ethnic-wear" className="mt-3 flex w-fit items-center gap-10 bg-[#1c1510] px-5 py-2 text-[9px] tracking-[0.2em] text-white">
          EXPLORE FESTIVE COLLECTION <ArrowRight size={12} />
        </Link>
      </div>
      <div className="hidden text-[8px] leading-[2] tracking-[0.25em] text-[#fdf3dc] md:block">
        <div>TRADITION</div><div>STYLE</div><div>GRACE</div><div>YOU</div>
        <span className="mt-1 block h-px w-12 bg-[#fdf3dc]" />
      </div>
    </Container>
  </section>
);

export default FestiveBanner;
