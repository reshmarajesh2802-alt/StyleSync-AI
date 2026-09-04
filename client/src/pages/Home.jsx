import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Collections from "../components/Collections";
import AIStylist from "../components/AIStylist";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Landing Experience */}
      <main>
        <Hero />

        {/* Features */}
        <section className="relative">
          <Features />
        </section>

        {/* How StyleSync Works */}
        <section className="relative">
          <HowItWorks />
        </section>

        {/* Fashion + Beauty Collections */}
        <section className="relative">
          <Collections />
        </section>

        {/* AI Personal Stylist */}
        <section className="relative">
          <AIStylist />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;