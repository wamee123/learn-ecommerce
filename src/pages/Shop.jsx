import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shop-page">

      <section className="shop-hero">
        <p>HANDCRAFTED COLLECTION</p>

        <h1>SHOP LEATHER</h1>

        <span>
          Timeless pieces made with quality materials and attention to detail.
        </span>
      </section>

      <section className="shop-content">

        <div className="shop-toolbar">
          <div>
            <p>COLLECTION</p>
            <h2>All Products</h2>
          </div>

          <div className="shop-search">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="shop-message">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="shop-message">
            No products found.
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

      </section>
    </div>
  );
}

export default Shop;