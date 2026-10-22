import { MapPin, Star } from "lucide-react";
import Container from "../../components/common/Container";

const TopBar = () => (
  <div className="bg-[#2a1d12] text-[10px] text-[#e6d7b8]">
    <Container className="flex items-center justify-between py-1.5">
      <span className="hidden sm:flex items-center gap-1"><Star size={9} fill="#d4a94f" stroke="none" /> Free Shipping on Orders Above ₹999</span>
      <span className="hidden md:inline">Premium Quality</span>
      <span className="mx-auto sm:mx-0">Easy Returns</span>
      <span className="hidden sm:flex items-center gap-1"><MapPin size={10} /> Kolkata, West Bengal</span>
    </Container>
  </div>
);

export default TopBar;
