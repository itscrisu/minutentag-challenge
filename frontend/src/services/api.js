const API_BASE = '/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products. Please try again later.');
  }

  return response.json();
};

export const fetchStockPrice = async (sku) => {
  const response = await fetch(`${API_BASE}/stock-price/${sku}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Product variant (SKU: ${sku}) not found.`);
    }
    throw new Error('Failed to fetch stock and price information. Please try again later.');
  }

  return response.json();
};
