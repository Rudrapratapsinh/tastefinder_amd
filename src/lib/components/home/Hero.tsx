
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, UtensilsCrossed } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-food-light to-white py-16 px-4 sm:py-24">
      <div className="container mx-auto text-center max-w-3xl">
        <UtensilsCrossed size={60} className="text-food-orange mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          <span className="text-food-red">Taste</span>
          <span className="text-[color:#9b87f5]">Finder</span>
          <span className="ml-2 px-3 py-1 rounded bg-food-orange/20 text-food-orange font-bold">Ahmedabad</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover the best restaurants across <span className="font-bold text-food-orange">Ahmedabad</span>, read reviews, and find your new favorite dining experiences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate("/restaurants")}
            className="bg-food-orange hover:bg-food-orange/90 text-white font-medium px-8 py-6 text-lg"
          >
            Explore Restaurants
            <ArrowRight className="ml-2" size={18} />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")}
            className="border-food-purple text-food-purple hover:bg-food-purple/10 font-medium px-8 py-6 text-lg"
          >
            Sign In / Register
          </Button>
        </div>
      </div>
    </div>
  );
}

