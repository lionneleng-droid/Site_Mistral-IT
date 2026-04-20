import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import AuditsSection from "../../components/AuditsSection";
import ServicesSection from "../../components/ServicesSection";
import ContactSection from "../../components/ContactSection";

export default function AuditsPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-16">
        <AuditsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
