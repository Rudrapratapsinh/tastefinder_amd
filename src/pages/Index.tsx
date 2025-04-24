
import { Hero } from "@/components/home/Hero";
import { FeaturedRestaurants } from "@/components/home/FeaturedRestaurants";
import { PopularCuisines } from "@/components/home/PopularCuisines";
import { AppFeatures } from "@/components/home/AppFeatures";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedRestaurants />
        <PopularCuisines />
        <AppFeatures />
      </main>
      <Footer />
    </div>
  );
}
