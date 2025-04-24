
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/types";
import { SAMPLE_RESTAURANTS, SAMPLE_REVIEWS } from "@/data/restaurants";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/restaurants/RestaurantCard";
import { useNavigate } from "react-router-dom";
import { Edit, Star } from "lucide-react";

export function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  if (!isAuthenticated || !user) {
    navigate("/login");
    return null;
  }
  
  // Get user's favorites
  const favoriteRestaurants = SAMPLE_RESTAURANTS.filter(restaurant => 
    user.favorites.includes(restaurant.id)
  );
  
  // Get user's reviews
  const userReviews = SAMPLE_REVIEWS.filter(review => 
    review.userId === user.id
  );
  
  // Get recently reviewed restaurants
  const reviewedRestaurantIds = userReviews.map(review => review.restaurantId);
  const reviewedRestaurants = SAMPLE_RESTAURANTS.filter(restaurant => 
    reviewedRestaurantIds.includes(restaurant.id)
  );
  
  // Get top cuisines
  const cuisinesFromFavorites = favoriteRestaurants.flatMap(r => r.cuisines);
  const cuisinesFromReviews = reviewedRestaurants.flatMap(r => r.cuisines);
  const allCuisines = [...cuisinesFromFavorites, ...cuisinesFromReviews];
  
  const cuisineCounts: Record<string, number> = {};
  allCuisines.forEach(cuisine => {
    cuisineCounts[cuisine] = (cuisineCounts[cuisine] || 0) + 1;
  });
  
  const topCuisines = Object.entries(cuisineCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cuisine]) => cuisine);
  
  const toggleFavorite = (restaurantId: string) => {
    if (!user) return;
    
    const updatedFavorites = user.favorites.includes(restaurantId)
      ? user.favorites.filter(id => id !== restaurantId)
      : [...user.favorites, restaurantId];
    
    // Update user favorites (in a real app, this would be an API call)
    user.favorites = updatedFavorites;
    localStorage.setItem("user", JSON.stringify(user));
    
    // Force a re-render (in a real app, this would happen with proper state management)
    navigate(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <Button variant="outline" className="flex gap-2">
            <Edit size={16} />
            <span>Edit Profile</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-muted-foreground text-sm">Name</span>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Email</span>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Member Since</span>
                <p className="font-medium">April 2025</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-muted-foreground text-sm">Reviews Written</span>
                <p className="font-medium">{userReviews.length}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Favorites Saved</span>
                <p className="font-medium">{favoriteRestaurants.length}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Average Rating Given</span>
                <p className="font-medium flex items-center">
                  {userReviews.length > 0 
                    ? (userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length).toFixed(1)
                    : "No ratings yet"}
                  {userReviews.length > 0 && (
                    <Star size={16} className="text-food-orange ml-1 fill-food-orange" />
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Preferences Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-muted-foreground text-sm">Top Cuisines</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {topCuisines.length > 0 ? (
                    topCuisines.map((cuisine, index) => (
                      <span 
                        key={index}
                        className="text-sm px-3 py-1 bg-secondary rounded-full"
                      >
                        {cuisine}
                      </span>
                    ))
                  ) : (
                    <p className="font-medium">Not enough data yet</p>
                  )}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">Most Visited Cities</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {[...new Set([...favoriteRestaurants, ...reviewedRestaurants].map(r => r.city))].slice(0, 2).map((city, index) => (
                    <span 
                      key={index}
                      className="text-sm px-3 py-1 bg-secondary rounded-full"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Favorite Restaurants */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
          
          {favoriteRestaurants.length === 0 ? (
            <Card className="bg-muted/40">
              <CardContent className="p-6 text-center">
                <p>You haven't added any restaurants to your favorites yet.</p>
                <Button 
                  onClick={() => navigate("/restaurants")} 
                  className="mt-4 bg-food-orange hover:bg-food-orange/90"
                >
                  Browse Restaurants
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRestaurants.map(restaurant => (
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
        
        {/* Recently Reviewed */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Recent Reviews</h2>
          
          {userReviews.length === 0 ? (
            <Card className="bg-muted/40">
              <CardContent className="p-6 text-center">
                <p>You haven't reviewed any restaurants yet.</p>
                <Button 
                  onClick={() => navigate("/restaurants")} 
                  className="mt-4 bg-food-orange hover:bg-food-orange/90"
                >
                  Find Restaurants to Review
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {userReviews.slice(0, 3).map(review => {
                const restaurant = SAMPLE_RESTAURANTS.find(r => r.id === review.restaurantId);
                if (!restaurant) return null;
                
                return (
                  <Card key={review.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <h3 className="font-semibold">{restaurant.name}</h3>
                          <p className="text-sm text-muted-foreground">{restaurant.city}</p>
                          <div className="flex items-center mt-1">
                            <Star size={14} className="text-food-orange mr-1 fill-food-orange" />
                            <span className="text-sm">{review.rating}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {review.date}
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                        >
                          View
                        </Button>
                      </div>
                      <p className="mt-2 text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                );
              })}
              
              {userReviews.length > 3 && (
                <div className="text-center">
                  <Button variant="outline">
                    View All Reviews
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
