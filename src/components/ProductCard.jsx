import { Link } from "react-router";
import "./ProductCard.css";

function ProductCard({ product }) {
  const hasDiscount =
    product.discountActive &&
    product.discountPrice &&
    product.discountPrice < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="product-placeholder">
            <span>LEATHER CO.</span>
          </div>
        )}

        {hasDiscount && (
          <span className="sale-badge">{discountPercentage}% OFF</span>
        )}

        {product.stock === 0 && (
          <span className="stock-badge">OUT OF STOCK</span>
        )}
      </div>

      <div className="product-info">
        <p className="product-category">
          {product.category || "LEATHER GOODS"}
        </p>

        <h3>{product.name}</h3>

        <div className="price-area">
          {hasDiscount ? (
            <>
              <span className="old-price">
                LKR {product.price.toLocaleString()}
              </span>

              <span className="sale-price">
                LKR {product.discountPrice.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="normal-price">
              LKR {product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;