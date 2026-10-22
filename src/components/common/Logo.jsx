import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { serif } from "../../utils/format";

const Logo = ({ dark }) => (
  <Link to="/" className="flex items-center gap-2">
    <div className="grid h-9 w-9 place-items-center rounded-full border border-[#b8934f] text-[#b8934f]">
      <Leaf size={18} />
    </div>
    <div className="leading-none">
      <div className={`${serif} text-[26px] font-semibold tracking-wide text-[#b8934f]`}>FLORANZA</div>
      <div className={`${serif} -mt-0.5 text-[11px] italic ${dark ? "text-[#c9b48a]" : "text-[#8a7a5a]"}`}>Grace meets Fashion</div>
    </div>
  </Link>
);

export default Logo;
