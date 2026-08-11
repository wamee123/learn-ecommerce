import { useState } from "react";
import { useNavigate } from "react-router";
import "./AdminLogin.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      navigate("/admin");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-left">
        <div className="admin-login-brand">
          <span>L</span>

          <div>
            <h2>LEATHER CO.</h2>
            <p>ADMINISTRATION</p>
          </div>
        </div>

        <div className="admin-login-message">
          <p>STORE MANAGEMENT</p>

          <h1>
            CONTROL.
            <br />
            MANAGE.
            <br />
            GROW.
          </h1>

          <span>
            Manage products, inventory, discounts and customer orders.
          </span>
        </div>
      </div>

      <div className="admin-login-right">
        <form
          className="admin-login-form"
          onSubmit={handleLogin}
        >
          <p className="admin-small-title">
            SECURE ADMIN ACCESS
          </p>

          <h2>Welcome Back</h2>

          <p className="admin-login-description">
            Sign in to manage your Leather Co. store.
          </p>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <label>Email Address</label>

          <input
            type="email"
            placeholder="admin@leatherco.lk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>

          <p className="admin-security-text">
            Authorized administrators only.
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;