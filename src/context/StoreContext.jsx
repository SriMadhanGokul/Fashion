import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getProduct, FREE_SHIP, SHIPPING } from "../data";

// Cart, wishlist, auth, orders – all persisted in localStorage (demo only; no real backend).
const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const load = (k, d) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("fl_cart", []));
  const [wishlist, setWishlist] = useState(() => load("fl_wish", []));
  const [users, setUsers] = useState(() => load("fl_users", []));
  const [user, setUser] = useState(() => load("fl_user", null));
  const [orders, setOrders] = useState(() => load("fl_orders", []));
  const [toast, setToast] = useState(null);
  const timer = useRef();

  useEffect(() => {
    Object.entries({ fl_cart: cart, fl_wish: wishlist, fl_users: users, fl_user: user, fl_orders: orders })
      .forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
  }, [cart, wishlist, users, user, orders]);

  const notify = (msg, link) => {
    setToast({ msg, link });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (id, { color, size, qty = 1 } = {}) => {
    const p = getProduct(id);
    color = color || p.colors[0].name;
    size = size || (p.sizes.includes("M") ? "M" : p.sizes[0]);
    const key = `${id}|${color}|${size}`;
    setCart((c) => (c.some((i) => i.key === key)
      ? c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      : [...c, { key, id, color, size, qty }]));
    notify(`${p.name} added to your bag`, true);
  };
  const updateQty = (key, qty) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.key !== key) : c.map((i) => (i.key === key ? { ...i, qty } : i))));
  const removeItem = (key) => setCart((c) => c.filter((i) => i.key !== key));

  const toggleWish = (id) => {
    const has = wishlist.includes(id);
    setWishlist(has ? wishlist.filter((x) => x !== id) : [...wishlist, id]);
    notify(has ? "Removed from wishlist" : "Saved to wishlist");
  };

  const register = ({ name, email, password }) => {
    email = email.trim().toLowerCase();
    if (users.some((u) => u.email === email)) return "An account with this email already exists.";
    setUsers([...users, { name: name.trim(), email, password }]);
    setUser({ name: name.trim(), email });
    return null;
  };
  const login = ({ email, password }) => {
    const u = users.find((x) => x.email === email.trim().toLowerCase() && x.password === password);
    if (!u) return "Incorrect email or password.";
    setUser({ name: u.name, email: u.email });
    return null;
  };
  const logout = () => { setUser(null); notify("You have been logged out"); };

  const placeOrder = () => {
    const items = cart.map((i) => ({ ...i, name: getProduct(i.id).name, price: getProduct(i.id).price }));
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const order = {
      id: "FL" + Date.now().toString().slice(-7), date: new Date().toISOString(), email: user.email, items,
      total: subtotal + (subtotal >= FREE_SHIP ? 0 : SHIPPING),
    };
    setOrders([order, ...orders]);
    setCart([]);
    return order;
  };

  const value = {
    cart, cartCount: cart.reduce((s, i) => s + i.qty, 0), addToCart, updateQty, removeItem,
    wishlist, toggleWish, user, register, login, logout, orders, placeOrder, toast,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
