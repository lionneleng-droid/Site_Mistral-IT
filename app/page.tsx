import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import OffresSection from "../components/OffresSection";
import AuditsSection from "../components/AuditsSection";
import ServicesSection from "../components/ServicesSection";
import ProcessSection from "../components/ProcessSection";
import WhySection from "../components/WhySection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import AboutSection from '../components/AboutSection';

export default function Home() {
  return (
    <>
      {/* Scroll-reveal side-effect (client) */}
      <ScrollReveal />

      <Navbar />

      <main>
        <HeroSection />
        <OffresSection />
        <AuditsSection />
        <ServicesSection />
        <ProcessSection />
        <WhySection />
        <ContactSection />
        <AboutSection />
      </main>

      <Footer />
    </>
  );
}
