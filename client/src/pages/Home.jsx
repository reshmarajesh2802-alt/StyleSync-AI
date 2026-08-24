import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Collections from "../components/Collections";
import AIStylist from "../components/AIStylist";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Collections />
      <AIStylist />
      <Footer />
    </div>
  );
}

export default Home;