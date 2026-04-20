import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import WhySection from "../../components/WhySection";
import ProcessSection from "../../components/ProcessSection";
import ContactSection from "../../components/ContactSection";

export default function PourquoiMoiPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-16">
        <WhySection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
