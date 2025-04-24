import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-food-red">Taste</span>
              <span className="text-xl font-bold text-[color:#9b87f5]">Finder</span>
              <span className="text-xl font-bold text-[color:#9b87f5] ml-1">Ahmedabad</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover the best dining experiences across Ahmedabad.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">App</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                support@foodiefinder.com
              </li>
              <li className="text-sm text-muted-foreground">
                +91 1234567890
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Foodie Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
