# Floranza Storefront (React + Tailwind + React Router)

```bash
npm install
npm run dev
```

## Routes
| Path | Page |
|---|---|
| `/` | Home |
| `/shop/new-arrivals`, `/shop/sarees`, `/shop/kurtis`, `/shop/ethnic-wear`, `/shop/co-ord-sets`, `/shop/others`, `/shop/all` | Collections (sort, price & colour filters) |
| `/search?q=…` | Search results (header search also shows live suggestions) |
| `/product/:id` | Product details (colour, size, qty, add to bag, buy now, wishlist) |
| `/cart` | Bag, quantity edit, remove, place order |
| `/login`, `/account` | Register / login, orders, wishlist, logout |

## Structure
```
src/
  components/  common/ (FashionArt, ProductCard, Logo…)  layout/ (Header, Footer, Layout)  sections/ (home blocks)
  context/StoreContext.jsx   cart, wishlist, auth, orders (localStorage)
  data/index.js              dummy catalogue – replace with your API
  pages/                     Home, Shop, Search, ProductDetail, Cart, Auth, Account
```
- Model images default to real product photos (`SmartImage`) with automatic SVG fallback (`FashionArt`).
- Auth is a front-end demo only (passwords stored in localStorage). Connect a real backend before going live.

## Deploy to Vercel

1. **Push to GitHub**: Commit your changes and push the repository to GitHub.
2. **Import into Vercel**: In the Vercel dashboard, click **Add New** > **Project** and select your GitHub repository.
3. **Configure Project Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy**: Click **Deploy**. SPA client-side routing is automatically handled via `vercel.json`.

