import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/me`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Not authorized");
        }

        return response.json();
      })
      .then(() => {
        setAuthorized(true);
        setLoading(false);
      })
      .catch(() => {
        setAuthorized(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#151515",
          color: "white",
          display: "grid",
          placeItems: "center",
        }}
      >
        Checking admin access...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;