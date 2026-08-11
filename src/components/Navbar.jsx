import { useState } from "react";
import { Link } from "react-router";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="store-navbar">
      <Link to="/" className="store-logo">
        <span>L</span>

        <div>
          <strong>LEATHER CO.</strong>
          <small>HANDCRAFTED GOODS</small>
        </div>
      </Link>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <nav className={menuOpen ? "store-nav-links open" : "store-nav-links"}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/shop" onClick={() => setMenuOpen(false)}>
          Shop
        </Link>

        <a href="/#about" onClick={() => setMenuOpen(false)}>
          About
        </a>

        <a href="/#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>

        <Link
          to="/cart"
          className="nav-cart"
          onClick={() => setMenuOpen(false)}
        >
          Cart
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;