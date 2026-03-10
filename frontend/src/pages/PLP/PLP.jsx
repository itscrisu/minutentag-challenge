import { useState, useEffect } from 'react';
import { fetchProducts, fetchStockPrice } from '../../services/api.js';
import Header from '../../components/Header/Header.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import styles from './PLP.module.css';

const PLP = () => {
  const [products, setProducts] = useState([]);
  const [stockPrices, setStockPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);

        const pricePromises = data.map(async (product) => {
          if (!product.skus || product.skus.length === 0) return null;
          const firstSku = product.skus[0].code;
          try {
            const sp = await fetchStockPrice(firstSku);
            return { productId: product.id, ...sp };
          } catch {
            return null;
          }
        });

        const results = await Promise.all(pricePromises);
        const priceMap = {};
        results.forEach((result) => {
          if (result) {
            priceMap[result.productId] = {
              price: result.price,
              stock: result.stock,
            };
          }
        });
        setStockPrices(priceMap);
      } catch (err) {
        window.alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <p className={styles.greeting}>Hi Mr. Michael,</p>
        <h1 className={styles.title}>Welcome Back!</h1>
        <h2 className={styles.sectionTitle}>Our Products</h2>

        {loading ? (
          <p className={styles.loadingText}>Loading products...</p>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => {
              const sp = stockPrices[product.id];
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  price={sp ? sp.price : null}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default PLP;
