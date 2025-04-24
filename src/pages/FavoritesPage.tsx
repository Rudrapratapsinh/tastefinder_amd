
import { FavoritesList } from "@/components/restaurants/FavoritesList";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <FavoritesList />
      </main>
      <Footer />
    </div>
  );
}
