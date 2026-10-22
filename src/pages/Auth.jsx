import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { serif } from "../utils/format";
import Container from "../components/common/Container";
import SmartImage from "../components/common/SmartImage";

export default function Auth() {
  const { user, login, register } = useStore();
  const navigate = useNavigate();
  const from = useLocation().state?.from || "/account";
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  if (user) return <Navigate to={from} replace />;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (mode === "register" && f.password.length < 6) return setError("Password must be at least 6 characters.");
    const err = mode === "login" ? login(f) : register(f);
    if (err) setError(err); else navigate(from, { replace: true });
  };
  const input = "w-full border border-stone-300 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#b8934f]";

  return (
    <Container className="py-12">
      <div className="mx-auto grid max-w-[820px] overflow-hidden border border-[#eadfc9] bg-[#fdfaf5] md:grid-cols-2">
        <div className="hidden md:block">
          <SmartImage
            src="/images/banners/festive-banner.jpg"
            art={{ type: "saree", color: "#7a1f2b", seed: 3 }}
            alt="Floranza Couture"
          />
        </div>
        <form onSubmit={submit} className="p-8">
          <h1 className={`${serif} text-[30px] font-medium`}>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <div className="mt-4 space-y-3">
            {mode === "register" && <input required placeholder="Full name" value={f.name} onChange={set("name")} className={input} />}
            <input required type="email" placeholder="Email address" value={f.email} onChange={set("email")} className={input} />
            <input required type="password" placeholder="Password" value={f.password} onChange={set("password")} className={input} />
          </div>
          {error && <p className="mt-3 text-[12px] text-red-700">{error}</p>}
          <button className="mt-5 w-full bg-[#1c1510] py-3 text-[11px] tracking-[0.2em] text-white">{mode === "login" ? "LOGIN" : "REGISTER"}</button>
          <p className="mt-4 text-[12px] text-stone-600">
            {mode === "login" ? "New to Floranza?" : "Already have an account?"}{" "}
            <button type="button" className="text-[#7a5a2e] underline" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
              {mode === "login" ? "Create an account" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </Container>
  );
}
