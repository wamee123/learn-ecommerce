import { Link } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <footer className="store-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <h2>LEATHER CO.</h2>

          <p>
            Premium handcrafted leather goods designed for everyday life and
            made to last.
          </p>
        </div>

        <div>
          <h3>SHOP</h3>
          <Link to="/shop">All Products</Link>
          <Link to="/shop">Wallets</Link>
          <Link to="/shop">Belts</Link>
          <Link to="/shop">Bags</Link>
        </div>

        <div>
          <h3>HELP</h3>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
          <a href="#">Delivery</a>
          <a href="#">Returns</a>
        </div>

        <div>
          <h3>CONTACT</h3>
          <p>Colombo, Sri Lanka</p>
          <p>+94 77 000 0000</p>
          <p>hello@leatherco.lk</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Leather Co. All rights reserved.</p>

        <p>Crafted in Sri Lanka.</p>
      </div>
    </footer>
  );
}

export default Footer;