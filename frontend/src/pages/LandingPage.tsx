import { Navbar } from "../components/marketing/Navbar";
import { Hero } from "../components/marketing/Hero";
import { Services } from "../components/marketing/Services";
import { Templates } from "../components/marketing/Templates";
import { Work } from "../components/marketing/Work";
import { FinalCta } from "../components/marketing/FinalCta";
import { Footer } from "../components/marketing/Footer";


export function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <Services />
      <Templates />
      <Work />
      <FinalCta />
      <Footer />
    </main>
  );
}
