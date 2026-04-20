import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import ServicesSection from "../../components/ServicesSection";
import ContactSection from "../../components/ContactSection";

export default function PrestationsPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-16">
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
