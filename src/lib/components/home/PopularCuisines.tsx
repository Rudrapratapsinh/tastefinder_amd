
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function PopularCuisines() {
  const navigate = useNavigate();
  
  const cuisines = [
    { name: "North Indian", count: 248 },
    { name: "South Indian", count: 186 },
    { name: "Chinese", count: 165 },
    { name: "Biryani", count: 132 },
    { name: "Street Food", count: 128 },
    { name: "Mughlai", count: 93 },
  ];

  return (
    <div className="bg-food-light py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Popular Cuisines
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cuisines.map((cuisine, index) => (
            <Card 
              key={index}
              className="hover:shadow-md transition-shadow cursor-pointer bg-white p-4 flex flex-col items-center text-center"
              onClick={() => navigate("/restaurants")}
            >
              <div className="bg-food-orange/10 p-3 rounded-full mb-3">
                <Utensils className="text-food-orange h-6 w-6" />
              </div>
              <h3 className="font-medium mb-1">{cuisine.name}</h3>
              <p className="text-sm text-muted-foreground">
                {cuisine.count} Restaurants
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
