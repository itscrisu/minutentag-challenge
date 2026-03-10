# Beer E-Commerce Backend

REST API server for the Beer E-Commerce application. Serves product catalog and real-time stock/price data.

## Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- npm (included with Node.js)

## Installation

```bash
cd backend
npm install
```

## Running the Server

**Development mode** (auto-restarts on file changes):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server runs on `http://localhost:3001` by default. Set the `PORT` environment variable to change it.

## API Endpoints

### GET `/api/products`

Returns the list of all products with their details.

**Response example:**

```json
[
  {
    "id": 127,
    "brand": "Modelo Especial",
    "image": "/products/modelo-especial.jpeg",
    "style": "Lager",
    "substyle": "Light Lager",
    "abv": "4.4%",
    "origin": "Import",
    "information": "...",
    "skus": [
      { "code": "10167", "name": "12 - 24oz Cans" },
      { "code": "10166", "name": "18 - 12oz Cans" },
      { "code": "10170", "name": "Half Barrel" }
    ]
  }
]
```

### GET `/api/stock-price/:sku`

Returns the price (in cents) and stock quantity for a given product size-variant identified by its SKU.

**Example:** `GET /api/stock-price/10041`

**Response:**

```json
{
  "stock": 8,
  "price": 2660
}
```

**Error (404):**

```json
{
  "error": "SKU \"99999\" not found"
}
```

> **Note:** Prices are returned in cents. Divide by 100 to get the dollar amount (e.g., `2660` = `$26.60`).
