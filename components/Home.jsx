import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MenuSection from "@/components/MenuSection";
import ReviewsSection from "@/components/ReviewsSection";
import RestaurantInterior from "@/components/RestaurantInterior";
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
        <ReviewsSection />
        <RestaurantInterior />
      </main>
      <Footer />
    </div>
  );
}
