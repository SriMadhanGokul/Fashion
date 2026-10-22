import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search, User, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { NAV, searchProducts, productImage } from "../../data";
import { serif, inr } from "../../utils/format";
import { useStore } from "../../context/StoreContext";
import Container from "../common/Container";
import Logo from "../common/Logo";
import SmartImage from "../common/SmartImage";

const Header = () => {
  const { cartCount, user } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => { setSearchOpen(false); setMenu(false); }, [pathname]);

  const results = q.trim() ? searchProducts(q).slice(0, 5) : [];
  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
    setQ("");
  };
  const linkCls = ({ isActive }) => `flex items-center gap-1 hover:text-[#b8934f] ${isActive ? "text-[#b8934f]" : ""}`;

  return (
    <header className="sticky top-0 z-30 bg-[#fdfaf5]/95 shadow-sm backdrop-blur">
      <Container className="flex h-[58px] items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
          <Logo />
        </div>
        <nav className="hidden items-center gap-8 text-[11px] text-stone-800 lg:flex">
          {NAV.map((n) => (
            <NavLink key={n.label} to={n.to} className={linkCls}>{n.label} {n.chevron && <ChevronDown size={11} />}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-5 text-stone-800">
          <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={16} strokeWidth={1.5} /></button>
          <Link to="/account" aria-label="Account" className="flex items-center">
            {user
              ? <span className="grid h-6 w-6 place-items-center rounded-full bg-[#b8934f] text-[11px] font-semibold text-white">{user.name[0].toUpperCase()}</span>
              : <User size={16} strokeWidth={1.5} />}
          </Link>
          <Link to="/cart" aria-label="Bag" className="relative">
            <ShoppingBag size={16} strokeWidth={1.5} />
            <span className="absolute -right-2.5 -top-2.5 grid h-3.5 min-w-[14px] place-items-center rounded-full bg-[#b8934f] px-0.5 text-[8px] text-white">{cartCount}</span>
          </Link>
        </div>
      </Container>

      {menu && (
        <nav className="border-t border-[#eadfc9] bg-[#fdfaf5] lg:hidden">
          <Container className="flex flex-col py-2 text-[13px]">
            {NAV.map((n) => <Link key={n.label} to={n.to} className="py-2.5">{n.label}</Link>)}
          </Container>
        </nav>
      )}

      {searchOpen && (
        <div className="border-t border-[#eadfc9] bg-[#fdfaf5] pb-3 shadow-md" onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}>
          <Container>
            <form onSubmit={submit} className="flex items-center gap-3 border-b border-stone-300 py-3">
              <Search size={16} className="text-stone-500" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sarees, kurtis, co-ord sets, colours…" className="w-full bg-transparent text-[13px] outline-none" />
              <button type="button" aria-label="Close" onClick={() => setSearchOpen(false)}><X size={16} /></button>
            </form>
            {q.trim() && (
              <ul className="mt-2">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link to={`/product/${p.id}`} className="flex items-center gap-3 py-1.5 hover:bg-[#f5ede1]">
                      <span className="h-12 w-9 flex-none overflow-hidden bg-stone-100">
                        <SmartImage
                          src={productImage(p)}
                          art={{ type: p.type, color: p.colors[0]?.hex, seed: p.seed }}
                          alt={p.name}
                        />
                      </span>
                      <span className={`${serif} flex-1 text-[14px]`}>{p.name}</span>
                      <span className="text-[12px] text-stone-600">{inr(p.price)}</span>
                    </Link>
                  </li>
                ))}
                {!results.length && <li className="py-2 text-[12px] text-stone-500">No matches for “{q}”.</li>}
                {!!results.length && <li><button onClick={submit} className="py-2 text-[11px] text-[#7a5a2e] underline">See all results for “{q}”</button></li>}
              </ul>
            )}
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
