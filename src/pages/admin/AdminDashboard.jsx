import { Link, useNavigate } from "react-router";
import "./AdminDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminDashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await fetch(`${API_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });

    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">

      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>L</span>
          <div>
            <h3>LEATHER CO.</h3>
            <small>ADMIN</small>
          </div>
        </div>

        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link>
        </nav>

        <button onClick={logout}>LOG OUT</button>
      </aside>

      <main className="admin-main">

        <div className="admin-heading">
          <div>
            <p>STORE MANAGEMENT</p>
            <h1>Dashboard</h1>
          </div>

          <Link to="/" target="_blank">
            VIEW STORE
          </Link>
        </div>

        <div className="admin-stats">

          <div className="stat-card">
            <span>PRODUCTS</span>
            <h2>—</h2>
            <p>Total products</p>
          </div>

          <div className="stat-card">
            <span>ORDERS</span>
            <h2>—</h2>
            <p>Total orders</p>
          </div>

          <div className="stat-card">
            <span>REVENUE</span>
            <h2>—</h2>
            <p>Total revenue</p>
          </div>

          <div className="stat-card">
            <span>LOW STOCK</span>
            <h2>—</h2>
            <p>Products running low</p>
          </div>

        </div>

        <section className="quick-actions">
          <p>QUICK ACTIONS</p>
          <h2>Manage your store</h2>

          <div className="action-grid">
            <Link to="/admin/products">
              <h3>Products</h3>
              <p>Add, edit, price and manage stock.</p>
            </Link>

            <Link to="/admin/orders">
              <h3>Orders</h3>
              <p>View and manage customer orders.</p>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;