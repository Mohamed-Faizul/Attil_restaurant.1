import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MenuSection from "@/components/MenuSection";
import ReviewsSection from "@/components/ReviewsSection";
import RestaurantInterior from "@/components/RestaurantInterior";
import AboutSecondSection from "@/components/AboutSecondSection";
import InstagramVideoSection from "@/components/InstagramVideoSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { Cursor } from "@/components/site-experiences";

export default function Home() {
  return (
    <div className="home-page">
      <Cursor />
      <Navbar />
      <main>
        <HeroBanner />
        <MenuSection />
        <RestaurantInterior />
        <ReviewsSection />
        <AboutSecondSection />
        <InstagramVideoSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
