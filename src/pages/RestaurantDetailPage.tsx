
import { RestaurantDetail } from "@/components/restaurants/RestaurantDetail";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RestaurantDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <RestaurantDetail />
      </main>
      <Footer />
    </div>
  );
}
