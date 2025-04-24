
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantCard } from "./RestaurantCard";
import { Restaurant } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SAMPLE_RESTAURANTS } from "@/data/restaurants";
import { Skeleton } from "@/components/ui/skeleton";

export function FavoritesList() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Simulate loading data with a slight delay
    const fetchFavorites = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (user?.favorites) {
        const favoriteRestaurants = SAMPLE_RESTAURANTS.filter(restaurant => 
          user.favorites.includes(restaurant.id)
        );
        
        setFavorites(favoriteRestaurants);
      }
      
      setLoading(false);
    };

    fetchFavorites();
  }, [user, isAuthenticated, navigate]);

  const toggleFavorite = (restaurantId: string) => {
    if (!user) return;
    
    // Update local state
    setFavorites(favorites.filter(restaurant => restaurant.id !== restaurantId));
    
    // Update user favorites (in a real app, this would be an API call)
    user.favorites = user.favorites.filter(id => id !== restaurantId);
    localStorage.setItem("user", JSON.stringify(user));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Your Favorite Restaurants</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-40 rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Restaurants</h1>
      
      {favorites.length === 0 ? (
        <Card className="bg-muted/40">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No Favorites Yet</h2>
            <p className="text-muted-foreground mb-4">
              You haven't added any restaurants to your favorites.
            </p>
            <Button 
              onClick={() => navigate("/restaurants")} 
              className="bg-food-orange hover:bg-food-orange/90"
            >
              Browse Restaurants
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(restaurant => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
