import ScrollToTop from "../components/ScrollToTop";
import CallToAction from "../sections/CallToAction";
import Faq from "../sections/Faq";
import Features from "../sections/Features";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import Hero from "../sections/Hero";
import Pricing from "../sections/Pricing";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <CallToAction />
      <Footer />
      <ScrollToTop />
    </>
  );
}
