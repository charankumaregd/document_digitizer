import { Outlet } from "react-router-dom";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
