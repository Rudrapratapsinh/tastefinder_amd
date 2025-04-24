
import { Link } from "react-router-dom";
import { Restaurant } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, StarIcon, Utensils } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function RestaurantCard({ 
  restaurant, 
  isFavorite = false,
  onToggleFavorite
}: RestaurantCardProps) {
  const { isAuthenticated } = useAuth();
  const { id, name, area, avgRating, totalRatingsString, cuisines, costForTwo, veg } = restaurant;
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <Link to={`/restaurant/${id}`}>
      <Card className="restaurant-card h-full overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            {isAuthenticated && onToggleFavorite && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart 
                  size={18} 
                  className={cn(
                    "transition-colors",
                    isFavorite ? "fill-food-red text-food-red" : "text-muted-foreground"
                  )} 
                />
              </Button>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={14} className="mr-1" />
            {area}
            {veg === "Yes" && (
              <span className="ml-2 flex items-center text-green-600">
                <Utensils size={14} className="mr-1" />
                Veg
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="flex items-center mr-2 bg-food-orange/10 px-2 py-1 rounded">
                <StarIcon size={14} className="text-food-orange mr-1" />
                <span className="text-sm font-medium">{avgRating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                {totalRatingsString} ratings
              </span>
              <span className="text-sm text-muted-foreground ml-2">{costForTwo}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {cuisines.map((cuisine, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-secondary rounded-full"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
