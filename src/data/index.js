// Dummy catalogue – swap with your API / CMS later.
export const FREE_SHIP = 999;
export const SHIPPING = 79;

export const COLORS = {
  maroon: "#7a1f2b", rose: "#d98e96", olive: "#4a5a3a", sage: "#7f9a6a", cream: "#e3d3b5", pink: "#e58f94",
  navy: "#1f3566", gold: "#c9a46a", lilac: "#bba5d0", teal: "#2f6f6a", mustard: "#d4a017", wine: "#5b1a33",
  peach: "#f0b49a", black: "#2a2a2e", ivory: "#efe6d4", coral: "#e5675a", blue: "#3b6aa8", brown: "#7a5535",
};

export const CATEGORIES = [
  { slug: "sarees", name: "Sarees", type: "saree", color: COLORS.maroon, image: "/images/products/Cotton Handloom Saree.webp", blurb: "Silk, organza and handloom drapes for every celebration." },
  { slug: "kurtis", name: "Kurtis", type: "kurti", color: COLORS.sage, image: "/images/products/Chikankari Kurti.jpg", blurb: "Everyday kurtis in soft fabrics and fine embroidery." },
  { slug: "ethnic-wear", name: "Ethnic Wear", type: "ethnic", color: COLORS.wine, image: "/images/products/Festive Ethnic Wear Set.webp", blurb: "Anarkalis, sharara sets and festive suits." },
  { slug: "co-ord-sets", name: "Co-ord Sets", type: "coord", color: COLORS.navy, image: "/images/products/Floral Printed Co-ord Set.webp", blurb: "Matching sets that move from day to night." },
  { slug: "others", name: "Others", type: "other", color: COLORS.lilac, image: "/images/products/Silk Lehenga Set.jpg", blurb: "Lehengas, dupattas, stoles and more." },
];

export const slug = (s = "") =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const productImage = (p) => {
  if (!p) return "";
  return `/images/products/${p.category}__${slug(p.name)}.jpg`;
};

// category, name, price, colours, flags (n = new arrival, f = featured)
const RAW = [
  ["sarees", "Banarasi Silk Saree", 2499, ["maroon", "rose", "olive"], "n"],
  ["sarees", "Organza Saree", 1999, ["maroon", "cream", "olive"], "nf"],
  ["sarees", "Kanjivaram Silk Saree", 4299, ["mustard", "wine", "teal"], ""],
  ["sarees", "Chiffon Floral Saree", 1599, ["peach", "sage", "lilac"], ""],
  ["sarees", "Cotton Handloom Saree", 1199, ["navy", "coral", "ivory"], ""],
  ["kurtis", "Embroidered Georgette Kurti", 1299, ["sage", "cream", "rose"], "n"],
  ["kurtis", "Chikankari Kurti", 1499, ["sage", "cream", "pink"], "nf"],
  ["kurtis", "Straight Cotton Kurti", 799, ["blue", "mustard", "coral"], ""],
  ["kurtis", "Anarkali Print Kurti", 1399, ["teal", "wine", "peach"], ""],
  ["kurtis", "Silk Blend Festive Kurti", 1899, ["gold", "maroon", "navy"], ""],
  ["ethnic-wear", "Festive Ethnic Wear Set", 2999, ["pink", "cream", "maroon"], "n"],
  ["ethnic-wear", "Designer Ethnic Set", 2699, ["maroon", "gold", "brown"], "nf"],
  ["ethnic-wear", "Embroidered Anarkali Suit", 3299, ["wine", "teal", "navy"], ""],
  ["ethnic-wear", "Sharara Suit Set", 2899, ["peach", "sage", "rose"], ""],
  ["ethnic-wear", "Velvet Festive Gown", 3499, ["wine", "navy", "black"], ""],
  ["co-ord-sets", "Printed Co-ord Set", 1899, ["navy", "cream", "blue"], "n"],
  ["co-ord-sets", "Floral Printed Co-ord Set", 1799, ["lilac", "cream", "brown"], "nf"],
  ["co-ord-sets", "Linen Co-ord Set", 1599, ["ivory", "sage", "coral"], ""],
  ["co-ord-sets", "Embroidered Co-ord Set", 2199, ["rose", "mustard", "teal"], ""],
  ["co-ord-sets", "Block Print Co-ord Set", 1699, ["mustard", "blue", "wine"], ""],
  ["others", "Silk Lehenga Set", 4999, ["maroon", "lilac", "teal"], "n"],
  ["others", "Zari Border Dupatta Set", 1299, ["gold", "wine", "sage"], ""],
  ["others", "Festive Skirt & Choli", 2399, ["pink", "navy", "mustard"], ""],
  ["others", "Cotton Palazzo Set", 999, ["ivory", "coral", "blue"], ""],
  ["others", "Phulkari Dupatta Set", 1149, ["coral", "teal", "lilac"], ""],
];

export const PRODUCTS = RAW.map(([category, name, price, cols, flags], i) => {
  const cat = CATEGORIES.find((c) => c.slug === category);
  return {
    id: `p${i + 1}`, seed: i, name, price, category, type: cat.type,
    image: productImage({ category, name }),
    mrp: Math.round((price * 1.3) / 100) * 100,
    colors: cols.map((n) => ({ name: n, hex: COLORS[n] })),
    sizes: category === "sarees" ? ["Free Size"] : ["S", "M", "L", "XL"],
    isNew: flags.includes("n"), isFeatured: flags.includes("f"),
    rating: (4 + ((i * 7) % 10) / 10).toFixed(1), reviews: 20 + i * 13,
    description: `${name} from our ${cat.name.toLowerCase()} collection – crafted in premium fabric with a graceful finish, designed to be worn from festive evenings to everyday elegance. Easy returns within 7 days.`,
  };
});

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
const pick = (...names) => names.map((n) => PRODUCTS.find((p) => p.name === n));
export const NEW_ARRIVALS = pick("Banarasi Silk Saree", "Embroidered Georgette Kurti", "Printed Co-ord Set", "Festive Ethnic Wear Set");
export const FEATURED = pick("Organza Saree", "Chikankari Kurti", "Designer Ethnic Set", "Floral Printed Co-ord Set");

export const searchProducts = (q) => {
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  return PRODUCTS.filter((p) => {
    const cat = CATEGORIES.find((c) => c.slug === p.category).name;
    const hay = `${p.name} ${cat} ${p.type} ${p.colors.map((c) => c.name).join(" ")}`.toLowerCase();
    return tokens.every((t) => hay.includes(t));
  });
};

export const NAV = [
  { label: "New Arrivals", to: "/shop/new-arrivals" },
  { label: "Sarees", to: "/shop/sarees" },
  { label: "Kurtis", to: "/shop/kurtis" },
  { label: "Ethnic Wear", to: "/shop/ethnic-wear" },
  { label: "Co-ord Sets", to: "/shop/co-ord-sets" },
  { label: "Others", to: "/shop/others", chevron: true },
];

export const HERO_SLIDES = [
  { eyebrow: "Women's Fashion", title: ["Timeless Elegance,", "Designed for Her"], text: "Discover a collection that celebrates your grace, confidence and individuality. From everyday chic to unforgettable occasions.", cta: "Shop the Collection", to: "/shop/all", type: "saree", color: "#d8b98a", image: "/images/banners/hero-1.jpg" },
  { eyebrow: "Festive Edit", title: ["Woven in Gold,", "Worn with Grace"], text: "Handloom silks and zari borders, made for the season of celebration.", cta: "Shop Sarees", to: "/shop/sarees", type: "saree", color: "#7a1f2b", image: "/images/banners/hero-2.jpg" },
  { eyebrow: "Everyday Chic", title: ["Easy Pieces,", "Endless Charm"], text: "Soft kurtis and co-ord sets that move with you from morning to evening.", cta: "Shop Kurtis", to: "/shop/kurtis", type: "kurti", color: "#6f8f5d", image: "/images/banners/hero-3.jpg" },
];

export const TESTIMONIALS = [
  { name: "Priya S.", text: "Absolutely in love with the saree! The quality and finish are premium. Will definitely shop again from Floranza." },
  { name: "Ananya R.", text: "Beautiful collections and amazing fit. Perfect for both office and festive occasions. Highly recommended!" },
  { name: "Megha T.", text: "Elegant designs and super comfortable fabrics. Floranza truly understands women's fashion." },
  { name: "Riya D.", text: "The kurti fabric is so soft and the embroidery is lovely. Delivery was quick too." },
  { name: "Sneha B.", text: "Ordered a co-ord set for a family function and got so many compliments." },
];

export const QUICK_LINKS = NAV;
export const CUSTOMER_CARE = ["About Us", "Shipping Policy", "Return & Exchange", "Size Guide", "FAQs", "Contact Us"];
