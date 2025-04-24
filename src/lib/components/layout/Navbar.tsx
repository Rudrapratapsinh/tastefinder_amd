
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

  const NavItems = () => (
    <>
      <Link to="/" className="text-foreground hover:text-food-orange transition-colors">
        Home
      </Link>
      <Link to="/restaurants" className="text-foreground hover:text-food-orange transition-colors">
        Restaurants
      </Link>
      {isAuthenticated ? (
        <>
          <Link to="/favorites" className="text-foreground hover:text-food-orange transition-colors">
            Favorites
          </Link>
          <Link to="/profile" className="text-foreground hover:text-food-orange transition-colors">
            Profile
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </>
      ) : (
        <Link to="/login">
          <Button variant="default" className="bg-food-orange hover:bg-food-orange/90">
            <User size={18} className="mr-2" />
            Login
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="border-b sticky top-0 z-30 bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-food-red">Taste</span>
          <span className="text-xl font-bold text-[color:#9b87f5]">Finder</span>
          {/* Removed Ahmedabad from here as requested */}
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-6 mt-10">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center space-x-6">
            <NavItems />
          </div>
        )}
      </div>
    </nav>
  );
}
