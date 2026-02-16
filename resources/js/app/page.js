// src/app/page.jsx

import Hero from "@/components/sections/Hero";
import ServicesSlider from "@/components/sections/ServicesSlider";
import HowItWorks from "@/components/sections/HowItWorks";
import TopWorkers from "@/components/sections/TopWorkers";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <ServicesSlider />
        <HowItWorks />
        <TopWorkers />
        <Testimonials />
        <Stats />
        <CTASection /> 
      </main>
    </>
  );
}
