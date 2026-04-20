import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import AuditsSection from "../../components/AuditsSection";
import ContactSection from "../../components/ContactSection";

export default function AuditsPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-16">
        <AuditsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
