import { useState, useEffect, useCallback } from 'react';
import { fetchStockPrice } from '../services/api.js';

const POLLING_INTERVAL = 5000;

const useStockPrice = (sku) => {
  const [data, setData] = useState({ stock: null, price: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStockPrice = useCallback(async () => {
    if (!sku) return;

    try {
      const result = await fetchStockPrice(sku);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sku]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    loadStockPrice();

    const interval = setInterval(loadStockPrice, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [loadStockPrice]);

  return { ...data, loading, error };
};

export default useStockPrice;
