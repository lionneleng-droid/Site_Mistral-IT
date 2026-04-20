import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import WhySection from "../../components/WhySection";
import ContactSection from "../../components/ContactSection";

export default function PourquoiMoiPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-16">
        <WhySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
