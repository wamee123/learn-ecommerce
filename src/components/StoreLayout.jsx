import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function StoreLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default StoreLayout;