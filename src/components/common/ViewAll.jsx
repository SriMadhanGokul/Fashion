import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ViewAll = ({ children, to = "/shop/all" }) => (
  <Link to={to} className="flex items-center gap-1.5 text-[11px] text-stone-700 hover:text-[#7a5a2e]">
    {children} <ArrowRight size={12} />
  </Link>
);

export default ViewAll;
