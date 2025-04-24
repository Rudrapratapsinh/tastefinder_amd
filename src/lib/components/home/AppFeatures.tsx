
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Search, Star, UserCheck } from "lucide-react";

export function AppFeatures() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Search className="h-8 w-8 text-food-orange" />,
      title: "Discover Restaurants",
      description: "Find the best places to eat across India's major cities."
    },
    {
      icon: <Star className="h-8 w-8 text-food-orange" />,
      title: "Rate & Review",
      description: "Share your dining experiences and help others find great food."
    },
    {
      icon: <Heart className="h-8 w-8 text-food-orange" />,
      title: "Save Favorites",
      description: "Build a personal collection of restaurants you love."
    },
    {
      icon: <UserCheck className="h-8 w-8 text-food-orange" />,
      title: "Personalized Recommendations",
      description: "Get restaurant suggestions based on your taste preferences."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        How Foodie Finder Works
      </h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Explore, discover, and share your favorite dining spots across India with our simple platform.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="bg-food-orange/10 rounded-full p-4 inline-block mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button 
          onClick={() => navigate("/register")}
          className="bg-food-purple hover:bg-food-purple/90 text-white px-6 py-2 text-lg"
        >
          Join Foodie Finder
        </Button>
      </div>
    </div>
  );
}
