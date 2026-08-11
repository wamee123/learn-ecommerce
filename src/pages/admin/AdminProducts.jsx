import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./AdminProducts.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const emptyForm = {
  name: "",
  category: "Wallets",
  price: "",
  discountPrice: "",
  discountActive: false,
  description: "",
  stock: "",
  image: "",
  active: true,
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD PRODUCTS
  // =========================
  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Load products error:", error);
      setMessage("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // FORM CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const url = editingId
      ? `${API_URL}/api/products/${editingId}`
      : `${API_URL}/api/products`;

    const method = editingId ? "PUT" : "POST";

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),

      discountPrice:
        form.discountPrice === ""
          ? null
          : Number(form.discountPrice),
    };

    try {
      const response = await fetch(url, {
        method: method,

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      if (editingId) {
        setMessage("Product updated successfully!");
      } else {
        setMessage("Product added successfully!");
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadProducts();
    } catch (error) {
      console.error("Save product error:", error);
      setMessage("Unable to connect to server");
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const editProduct = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      category: product.category || "Wallets",
      price: product.price ?? "",
      discountPrice: product.discountPrice ?? "",
      discountActive: product.discountActive ?? false,
      description: product.description || "",
      stock: product.stock ?? "",
      image: product.image || "",
      active: product.active ?? true,
    });

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to delete product");
        return;
      }

      setMessage("Product deleted successfully!");

      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }

      await loadProducts();
    } catch (error) {
      console.error("Delete product error:", error);
      setMessage("Unable to connect to server");
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  };

  return (
    <div className="admin-products-page">

      {/* TOP */}
      <div className="products-topbar">
        <div>
          <p>STORE MANAGEMENT</p>
          <h1>Products</h1>
        </div>

        <Link to="/admin">
          ← DASHBOARD
        </Link>
      </div>


      <div className="products-layout">

        {/* =========================
            PRODUCT FORM
        ========================= */}
        <section className="product-editor">

          <p className="section-label">
            {editingId ? "EDIT PRODUCT" : "ADD PRODUCT"}
          </p>

          <h2>
            {editingId ? "Update product" : "New product"}
          </h2>

          {message && (
            <div className="admin-product-message">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label>Product Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />


            <label>Category</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="Wallets">Wallets</option>
              <option value="Belts">Belts</option>
              <option value="Bags">Bags</option>
              <option value="Card Holders">
                Card Holders
              </option>
              <option value="Accessories">
                Accessories
              </option>
            </select>


            <div className="two-inputs">

              <div>
                <label>Regular Price (LKR)</label>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>


              <div>
                <label>Sale Price (LKR)</label>

                <input
                  type="number"
                  name="discountPrice"
                  min="0"
                  value={form.discountPrice}
                  onChange={handleChange}
                />
              </div>

            </div>


            <label className="checkbox-row">

              <input
                type="checkbox"
                name="discountActive"
                checked={form.discountActive}
                onChange={handleChange}
              />

              Discount Active

            </label>


            <label>Stock Quantity</label>

            <input
              type="number"
              name="stock"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
            />


            <label>Description</label>

            <textarea
              name="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description..."
            />


            <label>Image URL</label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />


            <label className="checkbox-row">

              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />

              Product Active

            </label>


            <button
              type="submit"
              className="save-product-btn"
            >
              {editingId
                ? "SAVE CHANGES"
                : "ADD PRODUCT"}
            </button>


            {editingId && (
              <button
                type="button"
                className="cancel-edit-btn"
                onClick={cancelEdit}
              >
                CANCEL EDIT
              </button>
            )}

          </form>

        </section>


        {/* =========================
            PRODUCT LIST
        ========================= */}
        <section className="admin-product-list">

          <div className="product-list-heading">
            <p>INVENTORY</p>

            <h2>All Products</h2>

            <span>
              {products.length} products
            </span>
          </div>


          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (

              <div
                className="admin-product-row"
                key={product._id}
              >

                {/* IMAGE */}
                <div className="admin-product-image">

                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  ) : (
                    <span>L</span>
                  )}

                </div>


                {/* DETAILS */}
                <div className="admin-product-data">

                  <small>
                    {product.category ||
                      "LEATHER GOODS"}
                  </small>

                  <h3>{product.name}</h3>


                  {product.discountActive &&
                  product.discountPrice ? (

                    <p>
                      <del>
                        LKR{" "}
                        {Number(
                          product.price
                        ).toLocaleString()}
                      </del>

                      {" "}

                      <strong>
                        LKR{" "}
                        {Number(
                          product.discountPrice
                        ).toLocaleString()}
                      </strong>
                    </p>

                  ) : (

                    <p>
                      LKR{" "}
                      {Number(
                        product.price
                      ).toLocaleString()}
                    </p>

                  )}


                  <span>
                    Stock: {product.stock ?? 0}
                  </span>

                </div>


                {/* BUTTONS */}
                <div className="admin-product-actions">

                  <button
                    type="button"
                    onClick={() =>
                      editProduct(product)
                    }
                  >
                    EDIT
                  </button>


                  <button
                    type="button"
                    className="delete-product"
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                  >
                    DELETE
                  </button>

                </div>

              </div>

            ))
          )}

        </section>

      </div>
    </div>
  );
}

export default AdminProducts;