import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../services/api.js';
import { parseProductSlug, formatPrice } from '../../utils/formatters.js';
import useStockPrice from '../../hooks/useStockPrice.js';
import SizeSelector from '../../components/SizeSelector/SizeSelector.jsx';
import './PDP.scss';

const PDP = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const { id } = parseProductSlug(productSlug);

  const [product, setProduct] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);
  const [loading, setLoading] = useState(true);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const { stock, price, error: stockError } = useStockPrice(selectedSku);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts();
        const found = products.find((p) => p.id === id);

        if (!found) {
          window.alert('Product not found.');
          navigate('/products');
          return;
        }

        setProduct(found);
        if (found.skus && found.skus.length > 0) {
          setSelectedSku(found.skus[0].code);
        }
      } catch (err) {
        window.alert(err.message);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  useEffect(() => {
    if (stockError) {
      window.alert(stockError);
    }
  }, [stockError]);

  const handleBack = () => {
    navigate('/products');
  };

  const handleMenuClick = () => {
    window.alert('Menu is not implemented in this version.');
  };

  const handleBagClick = () => {
    window.alert('This feature is not implemented in this version.');
  };

  const handleAddToCart = () => {
    if (!product) return;
    const selectedVariant = product.skus.find((s) => s.code === selectedSku);
    const variantName = selectedVariant ? selectedVariant.name : 'Unknown';
    const formattedPrice = price !== null ? formatPrice(price) : 'N/A';

    window.alert(
      `Added to cart:\n${product.brand} - ${variantName}\nPrice: ${formattedPrice}\nStock available: ${stock ?? 'N/A'}`
    );
  };

  const handleToggleDescription = () => {
    setDescriptionExpanded((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="pdp">
        <p className="pdp__loading">Loading product...</p>
      </div>
    );
  }

  if (!product) return null;

  const DESCRIPTION_LIMIT = 150;
  const isLongDescription = product.information && product.information.length > DESCRIPTION_LIMIT;
  const displayDescription = descriptionExpanded || !isLongDescription
    ? product.information
    : `${product.information.substring(0, DESCRIPTION_LIMIT)}...`;

  return (
    <div className="pdp">
      <header className="pdp__header">
        <button
          className="pdp__header-btn"
          onClick={handleBack}
          aria-label="Go back"
          tabIndex={0}
        >
          <img src="/icons/icon-back.svg" alt="" width={24} height={24} aria-hidden="true" />
        </button>
        <h1 className="pdp__header-title">Detail</h1>
        <button
          className="pdp__header-btn"
          onClick={handleMenuClick}
          aria-label="More options"
          tabIndex={0}
        >
          <img src="/icons/icon-dots.svg" alt="" width={24} height={24} aria-hidden="true" />
        </button>
      </header>

      <div className="pdp__image-area">
        <img
          src={product.image}
          alt={product.brand}
          className="pdp__image"
        />
      </div>

      <div className="pdp__card">
        <div className="pdp__content">
          <div className="pdp__title-row">
            <h2 className="pdp__brand">{product.brand}</h2>
            <span className="pdp__price">
              {price !== null ? formatPrice(price) : '...'}
            </span>
          </div>

          <p className="pdp__meta">
            Origin: {product.origin} &nbsp;|&nbsp; Stock: {stock ?? '...'}
          </p>

          <section className="pdp__section">
            <h3 className="pdp__section-title">Description</h3>
            <p className="pdp__description">
              {displayDescription}
              {isLongDescription && (
                <button
                  className="pdp__read-more"
                  onClick={handleToggleDescription}
                >
                  {descriptionExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </p>
          </section>

          <section className="pdp__section">
            <h3 className="pdp__section-title">Size</h3>
            <SizeSelector
              skus={product.skus}
              selectedSku={selectedSku}
              onSelect={setSelectedSku}
            />
          </section>
        </div>

        <div className="pdp__bottom-bar">
          <button
            className="pdp__bag-btn"
            onClick={handleBagClick}
            aria-label="Shopping bag"
            tabIndex={0}
          >
            <img src="/icons/icon-bag.svg" alt="" width={24} height={24} aria-hidden="true" />
          </button>
          <button
            className="pdp__add-to-cart"
            onClick={handleAddToCart}
            aria-label="Add to cart"
            tabIndex={0}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDP;
