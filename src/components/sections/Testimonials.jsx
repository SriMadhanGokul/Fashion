import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data";
import { serif } from "../../utils/format";
import Container from "../../components/common/Container";

const Testimonials = () => {
  const [start, setStart] = useState(0);
  const shown = [0, 1, 2].map((k) => TESTIMONIALS[(start + k) % TESTIMONIALS.length]);
  const step = (d) => setStart((start + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  return (
  <section className="py-6">
    <Container>
      <p className="text-[9px] tracking-[0.3em] text-stone-500">TESTIMONIALS</p>
      <div className="mb-4 flex items-end justify-between">
        <h2 className={`${serif} text-[28px] font-medium text-stone-900`}>Words from Our Women</h2>
        <div className="flex items-center gap-3 text-[10px] text-stone-500">
          <span className="hidden sm:inline">Real stories. Genuine love.</span>
          <button aria-label="Previous" onClick={() => step(-1)} className="grid h-5 w-5 place-items-center rounded-full border border-stone-300"><ChevronLeft size={11} /></button>
          <button aria-label="Next" onClick={() => step(1)} className="grid h-5 w-5 place-items-center rounded-full border border-stone-300"><ChevronRight size={11} /></button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {shown.map((t) => (
          <div key={t.name} className="relative flex gap-3 border border-[#eadfc9] bg-[#fdfaf5] p-4">
            <div className="grid h-12 w-12 flex-none place-items-center rounded-full bg-gradient-to-br from-[#d9bf96] to-[#a67c52] text-[16px] font-semibold text-white">{t.name[0]}</div>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, k) => <Star key={k} size={10} fill="#e8913a" stroke="none" />)}
              </div>
              <p className={`${serif} mt-1 text-[12px] leading-snug text-stone-700`}>“{t.text}”</p>
              <p className={`${serif} mt-1.5 text-[12px] font-semibold text-stone-800`}>{t.name}</p>
            </div>
            <Quote size={22} className="absolute bottom-3 right-4 text-[#e1d4b9]" fill="currentColor" />
          </div>
        ))}
      </div>
    </Container>
  </section>
);
};

export default Testimonials;
