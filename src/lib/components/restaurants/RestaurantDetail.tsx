
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Restaurant, Review } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, MapPin, Star, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { getRestaurantById, getReviewsByRestaurantId, addReview } from "@/data/restaurants";
import { Skeleton } from "@/components/ui/skeleton";

export function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if restaurant is a favorite
  useEffect(() => {
    if (user && restaurant) {
      setIsFavorite(user.favorites.includes(restaurant.id));
    }
  }, [user, restaurant]);

  // Fetch restaurant and reviews
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!id) {
        navigate("/restaurants");
        return;
      }
      
      try {
        const foundRestaurant = await getRestaurantById(id);
        if (!foundRestaurant) {
          navigate("/restaurants");
          return;
        }
        
        const restaurantReviews = getReviewsByRestaurantId(id);
        
        setRestaurant(foundRestaurant);
        setReviews(restaurantReviews);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        navigate("/restaurants");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate]);

  const handleToggleFavorite = () => {
    if (!user || !restaurant) return;
    
    const updatedFavorites = isFavorite
      ? user.favorites.filter(fav => fav !== restaurant.id)
      : [...user.favorites, restaurant.id];
    
    // Update state
    setIsFavorite(!isFavorite);
    
    // Update user favorites (in a real app, this would be an API call)
    user.favorites = updatedFavorites;
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSubmitReview = async () => {
    if (!user || !restaurant || !userRating) return;
    
    setSubmitting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newReview = {
      restaurantId: restaurant.id,
      userId: user.id,
      userName: user.name,
      rating: userRating,
      comment: userReview
    };
    
    const addedReview = addReview(newReview);
    
    // Update reviews list
    setReviews(prev => [addedReview, ...prev]);
    
    // Reset form
    setUserRating(0);
    setUserReview("");
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 w-60" />
          </div>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg">Restaurant not found.</p>
        <Button 
          onClick={() => navigate("/restaurants")}
          className="mt-4"
        >
          Go to Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="gap-2" 
          onClick={() => navigate("/restaurants")}
        >
          <ArrowLeft size={16} />
          <span>Back to Restaurants</span>
        </Button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin size={16} className="mr-1" />
              <span>{restaurant.city}</span>
            </div>
          </div>
          
          {isAuthenticated && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleToggleFavorite}
            >
              <Heart 
                size={16} 
                className={cn(
                  "transition-colors",
                  isFavorite ? "fill-food-red text-food-red" : ""
                )} 
              />
              <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
            </Button>
          )}
        </div>
        
        {/* Restaurant Info */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Star size={18} className="text-food-orange mr-2" />
                  <span className="text-lg font-semibold">{restaurant.avgRating.toFixed(1)}</span>
                  <span className="text-muted-foreground ml-2">
                    ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                  </span>
                </div>
                
                <div>
                  <span className="font-medium">Cuisines:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {restaurant.cuisines.map((cuisine, index) => (
                      <span 
                        key={index}
                        className="text-sm px-3 py-1 bg-secondary rounded-full"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Cost for Two:</span>
                  <p className="text-lg">{restaurant.costForTwo}</p>
                </div>
                
                <div>
                  <span className="font-medium">Address:</span>
                  <p className="text-secondary-foreground">{restaurant.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for Reviews and Information */}
        <Tabs defaultValue="reviews" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reviews" className="space-y-6">
            {/* Add Review */}
            {isAuthenticated ? (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2">Your Rating</p>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            variant="ghost"
                            size="icon"
                            onClick={() => setUserRating(star)}
                            className={cn(
                              "h-8 w-8",
                              userRating >= star ? "text-food-orange" : "text-gray-300"
                            )}
                          >
                            <Star size={20} className={userRating >= star ? "fill-food-orange" : ""} />
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Textarea
                      placeholder="Share your experience with this restaurant..."
                      value={userReview}
                      onChange={(e) => setUserReview(e.target.value)}
                      rows={3}
                    />
                    
                    <Button 
                      onClick={handleSubmitReview}
                      disabled={userRating === 0 || submitting}
                      className="bg-food-orange hover:bg-food-orange/90"
                    >
                      Submit Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-muted/40">
                <CardContent className="p-6 text-center">
                  <p>Please log in to leave a review.</p>
                  <Button 
                    className="mt-2 bg-food-orange hover:bg-food-orange/90"
                    onClick={() => navigate("/login")}
                  >
                    Login to Review
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {/* Reviews List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
              </h3>
              
              {reviews.length === 0 ? (
                <Card className="bg-muted/40">
                  <CardContent className="p-6 text-center">
                    <p>No reviews yet. Be the first to share your experience!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="bg-muted rounded-full p-2 mr-3">
                              <User size={16} />
                            </div>
                            <div>
                              <p className="font-medium">{review.userName}</p>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center bg-food-orange/10 px-2 py-1 rounded">
                            <Star size={14} className="text-food-orange mr-1" />
                            <span className="text-sm font-medium">{review.rating}</span>
                          </div>
                        </div>
                        <p className="mt-3">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Restaurant Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p>{restaurant.address}, {restaurant.city}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Cuisines</h4>
                    <p>{restaurant.cuisines.join(", ")}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Average Cost</h4>
                    <p>{restaurant.costForTwo} for two people</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
