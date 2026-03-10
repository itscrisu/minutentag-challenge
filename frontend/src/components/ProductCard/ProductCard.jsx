import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toProductSlug, formatPrice } from '../../utils/formatters.js';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, price }) => {
  const navigate = useNavigate();
  const slug = toProductSlug(product.id, product.brand);

  const handleCardClick = () => {
    navigate(`/product/${slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.alert(`Added "${product.brand}" to cart.`);
  };

  return (
    <article
      className={styles.card}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`View details for ${product.brand}`}
    >
      <h3 className={styles.brand}>{product.brand}</h3>
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.brand}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>
          {price !== null ? formatPrice(price) : '...'}
        </span>
      </div>
      <button
        className={styles.addButton}
        onClick={handleAddClick}
        aria-label={`Add ${product.brand} to cart`}
        tabIndex={0}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>
    </article>
  );
};

export default ProductCard;
