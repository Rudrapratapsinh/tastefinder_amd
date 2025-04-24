
import { useEffect, useState } from "react";
import { RestaurantCard } from "@/components/restaurants/RestaurantCard";
import { Restaurant } from "@/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight } from "lucide-react";
import { getAllRestaurants } from "@/data/restaurants"; // Change here
// import { SAMPLE_RESTAURANTS } from "@/data/restaurants"; // Remove this import

export function FeaturedRestaurants() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [topRestaurants, setTopRestaurants] = useState<Restaurant[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Fetch full list and sort by top ratings, only from actual dataset
    async function fetchTopRestaurants() {
      try {
        const allRestaurants = await getAllRestaurants(true); // force fresh fetch, avoids cache
        // Top 4 highest rated
        const highestRated = [...allRestaurants]
          .sort((a, b) => b.avgRating - a.avgRating)
          .slice(0, 4);

        setTopRestaurants(highestRated);
      } catch (err) {
        console.error("Failed to fetch featured restaurants:", err);
        setTopRestaurants([]);
      }
    }

    fetchTopRestaurants();
  }, []);

  useEffect(() => {
    if (user?.favorites) {
      setFavorites(user.favorites);
    }
  }, [user]);

  const toggleFavorite = (restaurantId: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    let updatedFavorites: string[];

    if (favorites.includes(restaurantId)) {
      updatedFavorites = favorites.filter(id => id !== restaurantId);
    } else {
      updatedFavorites = [...favorites, restaurantId];
    }

    setFavorites(updatedFavorites);

    // Update user favorites (in a real app, this would be an API call)
    if (user) {
      user.favorites = updatedFavorites;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Top Rated Restaurants</h2>
        <Button
          variant="ghost"
          className="text-food-orange hover:text-food-orange/90 hover:bg-food-orange/10 font-medium flex items-center"
          onClick={() => navigate("/restaurants")}
        >
          View All
          <ArrowRight className="ml-1" size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topRestaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isFavorite={favorites.includes(restaurant.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
