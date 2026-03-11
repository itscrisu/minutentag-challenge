# Beer E-Commerce Frontend

React single-page application for the Beer E-Commerce challenge. Mobile-first design with a Product Listing Page (PLP) and a Product Details Page (PDP).

## Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- npm (included with Node.js)
- The backend server running on `http://localhost:3001` (see `../backend/README.md`)

## Installation

```bash
cd frontend
npm install
```

## Running the App

Make sure the backend server is running first, then:

**Development mode:**

```bash
npm run dev
```

The app runs on `http://localhost:5173` by default. API requests to `/api` are proxied to the backend at `http://localhost:3001`.

**Production build:**

```bash
npm run build
npm run preview
```

## Pages

### PLP — Product Listing Page (`/products`)

- Displays all available products in a responsive grid (2 columns on mobile, flexible on desktop)
- Each product card shows: brand name, product image, price, and an "Add to cart" button
- Card border-radius alternates between products for visual variety
- Clicking a card navigates to the product detail page

### PDP — Product Details Page (`/product/:id-:brand`)

- Shows detailed product information: image, brand, price, origin, stock, and description
- Size/variant selector allows switching between available SKUs
- Price and stock update automatically every 5 seconds via polling
- "Add to cart" button displays the selected variant information
- URL format example: `/product/127-modelo-especial`

## Project Structure

```
src/
├── components/
│   ├── Header/           Header with menu and avatar (PLP)
│   ├── ProductCard/      Product card for the grid
│   └── SizeSelector/     Size variant pill selector (PDP)
├── hooks/
│   └── useStockPrice.js  Custom hook with 5-second polling
├── pages/
│   ├── PLP/              Product Listing Page (CSS Modules)
│   └── PDP/              Product Details Page (SASS)
├── services/
│   └── api.js            API fetch functions
├── utils/
│   └── formatters.js     Price formatting and URL slug utilities
├── App.jsx               Router setup
└── main.jsx              Entry point
```

## Styling

- **PLP**: Styled with CSS Modules (`.module.css`)
- **PDP**: Styled with SASS (`.scss`) — no CSS libraries used, as per challenge requirements
- **Font**: DM Sans (loaded from Google Fonts)

## Technical Notes

- Prices from the API are in **cents** and are formatted as dollars (e.g., `2865` → `$28.65`)
- The PDP polls the `/api/stock-price/:sku` endpoint every 5 seconds for real-time updates
- Non-implemented features (menu, shopping bag, etc.) display informational alerts via `window.alert()`
- Error messages are reported via `window.alert()` as specified in the challenge requirements
