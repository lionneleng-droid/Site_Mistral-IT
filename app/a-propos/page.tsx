import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AboutSection from "../../components/AboutSection";
import ContactSection from "../../components/ContactSection";

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
