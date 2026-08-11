import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import "./ProductDetails.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="product-status">Loading product...</div>;
  }

  if (!product) {
    return <div className="product-status">Product not found.</div>;
  }

  const hasDiscount =
    product.discountActive &&
    product.discountPrice &&
    product.discountPrice < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-details-page">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="product-details-container">
        <div className="details-image-area">
          {product.image ? (
           <img
  src={product.image.startsWith("/") ? product.image : `/${product.image}`}
  alt={product.name}
/>
          ) : (
            <div className="details-placeholder">
              <span>LEATHER CO.</span>
              <p>HANDCRAFTED GOODS</p>
            </div>
          )}

          {hasDiscount && (
            <div className="details-sale-badge">
              {discountPercentage}% OFF
            </div>
          )}
        </div>

        <div className="details-content">
          <p className="details-category">
            {product.category || "PREMIUM LEATHER"}
          </p>

          <h1>{product.name}</h1>

          <div className="details-divider"></div>

          <div className="details-price">
            {hasDiscount ? (
              <>
                <span className="details-old-price">
                  LKR {product.price.toLocaleString()}
                </span>

                <span className="details-sale-price">
                  LKR {product.discountPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="details-normal-price">
                LKR {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <p className="details-description">
            {product.description ||
              "A premium handcrafted leather product designed for everyday use."}
          </p>

          <div className="stock-row">
            <span>AVAILABILITY</span>

            {product.stock > 0 ? (
              <strong className="in-stock">
                IN STOCK ({product.stock})
              </strong>
            ) : (
              <strong className="out-stock">OUT OF STOCK</strong>
            )}
          </div>

          {product.stock > 0 && (
            <>
              <div className="quantity-area">
                <p>QUANTITY</p>

                <div className="quantity-selector">
                  <button onClick={decreaseQuantity}>−</button>
                  <span>{quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </div>
              </div>

              <button className="add-cart-button">
                ADD TO CART — LKR{" "}
                {(
                  (hasDiscount
                    ? product.discountPrice
                    : product.price) * quantity
                ).toLocaleString()}
              </button>

              <button className="buy-now-button">
                BUY NOW
              </button>
            </>
          )}

          <div className="product-benefits">
            <div>
              <strong>PREMIUM QUALITY</strong>
              <span>Selected leather materials</span>
            </div>

            <div>
              <strong>ISLANDWIDE DELIVERY</strong>
              <span>Delivery across Sri Lanka</span>
            </div>

            <div>
              <strong>SECURE PAYMENT</strong>
              <span>Safe checkout process</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;