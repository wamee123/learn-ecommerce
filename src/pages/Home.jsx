import { Link } from "react-router";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="gold-diamonds">◆ ◆ ◆</div>

          <h1>
            CRAFTED
            <br />
            FOR LIFE.
          </h1>

          <p>
            Premium handcrafted leather goods designed with timeless style,
            durability and character.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="primary-btn">
              SHOP NOW
            </Link>

            <a href="#about" className="secondary-btn">
              ▶ &nbsp; OUR STORY
            </a>
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="info-strip">
        <div>
          <span>01</span>
          <h3>PREMIUM LEATHER</h3>
          <p>Carefully selected materials</p>
        </div>

        <div>
          <span>02</span>
          <h3>ISLANDWIDE DELIVERY</h3>
          <p>Delivered across Sri Lanka</p>
        </div>

        <div>
          <span>03</span>
          <h3>CRAFTED TO LAST</h3>
          <p>Built for everyday use</p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section" id="about">
        <div className="why-image">
          <div className="image-text">
            <span>HANDCRAFTED</span>
            <h2>Built by hands.<br />Made with purpose.</h2>
          </div>
        </div>

        <div className="why-content">
          <p className="small-heading">OUR CRAFT</p>

          <h2>Why Choose Us?</h2>

          <div className="gold-diamonds">◆ ◆ ◆</div>

          <p className="intro-text">
            We create leather products that combine traditional craftsmanship
            with a clean modern style.
          </p>

          <div className="feature">
            <span>01</span>
            <div>
              <h3>Premium Materials</h3>
              <p>
                Quality leather and carefully selected materials for long-term
                durability.
              </p>
            </div>
          </div>

          <div className="feature">
            <span>02</span>
            <div>
              <h3>Attention to Detail</h3>
              <p>
                Every product is designed with practical details and refined
                finishing.
              </p>
            </div>
          </div>

          <div className="feature">
            <span>03</span>
            <div>
              <h3>Timeless Design</h3>
              <p>
                Simple, elegant leather goods that stay stylish year after
                year.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;