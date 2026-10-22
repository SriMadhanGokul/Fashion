import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { HERO_SLIDES } from "../../data";
import { serif } from "../../utils/format";
import Container from "../common/Container";
import SmartImage from "../common/SmartImage";

const Hero = () => {
  const [i, setI] = useState(0);
  const n = HERO_SLIDES.length;
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);
  const s = HERO_SLIDES[i];

  return (
    <section className="relative h-[430px] overflow-hidden bg-[#2e2014] text-white md:h-[450px]">
      {HERO_SLIDES.map((h, k) => (
        <div key={k} className={`absolute inset-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0"}`}>
          <SmartImage
            src={`/images/banners/hero-${k + 1}.jpg`}
            art={{ wide: true, type: h.type, color: h.color, seed: k }}
            alt={h.eyebrow}
            className="object-[center_35%]"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2a1c10]/95 via-[#2a1c10]/60 to-transparent" />
      <Container className="relative z-10 flex h-full flex-col justify-center">
        <p className="mb-3 text-[10px] tracking-[0.35em] text-[#d9c7a3]">{s.eyebrow.toUpperCase()}</p>
        <h1 className={`${serif} text-[40px] font-medium leading-[1.05] md:text-[52px]`}>
          {s.title[0]}<br />{s.title[1]}
        </h1>
        <p className="mt-4 max-w-[330px] text-[12px] leading-relaxed text-[#e9dcc2]">{s.text}</p>
        <Link to={s.to} className="mt-6 flex w-fit items-center gap-8 bg-[#1c1510] px-6 py-3 text-[10px] tracking-[0.2em] hover:bg-black">
          {s.cta.toUpperCase()} <ArrowRight size={13} />
        </Link>
        <div className="mt-8 flex items-center gap-3 text-[9px] text-[#d9c7a3]">
          <span className="h-[3px] w-6 bg-[#d9c7a3]" />
          {HERO_SLIDES.map((_, k) => (
            <button key={k} onClick={() => setI(k)} className={k === i ? "text-white" : "opacity-70"}>0{k + 1}</button>
          ))}
        </div>
      </Container>
      <button aria-label="Previous" onClick={() => setI((i - 1 + n) % n)} className="absolute left-6 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/50 md:grid"><ChevronLeft size={14} /></button>
      <button aria-label="Next" onClick={() => setI((i + 1) % n)} className="absolute right-6 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/50 md:grid"><ChevronRight size={14} /></button>
    </section>
  );
};

export default Hero;
