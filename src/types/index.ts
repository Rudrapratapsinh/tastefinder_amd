
export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  area: string;
  avgRating: number;
  totalRatingsString: string;
  cuisines: string[];
  costForTwo: string;
  address: string;
  veg: "Yes" | "No";
  userRating?: number;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
