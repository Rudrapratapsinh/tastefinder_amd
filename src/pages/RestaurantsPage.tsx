
import { RestaurantList } from "@/components/restaurants/RestaurantList";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Explore Restaurants in <span className="text-food-orange">Ahmedabad</span> with <span className="text-[color:#9b87f5]">TasteFinder</span></h1>
            <p className="text-muted-foreground mt-2">
              Browse through our collection of over 1,000 restaurants across Ahmedabad. 
              Use filters to find your perfect dining spot by area, cuisine, budget, or dietary preference.
            </p>
          </div>
          <RestaurantList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
