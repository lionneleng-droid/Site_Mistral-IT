import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import ProcessSection from "../../components/ProcessSection";
import ContactSection from "../../components/ContactSection";

export default function MethodePage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-16">
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
