import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { serif } from "../../utils/format";
import Container from "../../components/common/Container";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
  <section className="mt-6 bg-[#f4e8d3]">
    <Container className="flex flex-col items-center justify-between gap-4 py-5 md:flex-row">
      <div className="md:pl-24">
        <h3 className={`${serif} text-[26px] font-medium text-stone-900`}>A little elegance, delivered.</h3>
        <p className="text-[10px] text-stone-600">Subscribe to get exclusive offers, new arrivals and style updates.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (email) { setDone(true); setEmail(""); } }} className="flex w-full max-w-[420px]">
        <label className="flex flex-1 items-center gap-2 border border-[#e3d3b5] bg-white px-3">
          <Mail size={13} className="text-stone-500" />
          <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setDone(false); }} placeholder="Enter your email address" className="w-full bg-transparent py-2.5 text-[10px] outline-none" />
        </label>
        <button className="flex items-center gap-4 bg-[#1c1510] px-6 text-[10px] tracking-[0.15em] text-white">
          {done ? "SUBSCRIBED ✓" : "SUBSCRIBE"} <ArrowRight size={12} />
        </button>
      </form>
    </Container>
  </section>
);
};

export default Newsletter;
