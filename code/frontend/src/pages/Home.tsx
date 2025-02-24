import Cta from "@/sections/Cta";
import Faq from "@/sections/Faq";
import Features from "@/sections/Features";
import Hero from "@/sections/Hero";
import Pricing from "@/sections/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Cta />
    </main>
  );
}
