import Hero from "@/components/sections/Hero";
import ServicesSlider from "@/components/sections/ServicesSlider";
import HowItWorks from "@/components/sections/HowItWorks";
import TopWorkers from "@/components/sections/TopWorkers";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import CTASection from "@/components/sections/CTASection";
import { Head } from "@inertiajs/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export default function Home() {
    return (

         <>
      <main>
        <Header />
        <Hero />
        <ServicesSlider />
        <HowItWorks />
        <TopWorkers />
        <Testimonials />
        <Stats />
        <CTASection /> 
        <Footer />
      </main>
    </>

    
    );
}