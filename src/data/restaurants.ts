import { Restaurant, Review } from "@/types";
import { loadRestaurantData, paginateRestaurants } from "@/utils/csvLoader";

// This would typically come from a database or API
// For demo purposes, we're creating a sample dataset based on the new CSV structure
export const SAMPLE_RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "Spice Garden",
    city: "Mumbai",
    area: "Lower Parel",
    avgRating: 4.5,
    totalRatingsString: "1.2K",
    cuisines: ["North Indian", "Chinese"],
    costForTwo: "₹800",
    address: "Shop 1, Ground Floor, Kamala Mills Compound, Lower Parel, Mumbai",
    veg: "No"
  },
  {
    id: "2",
    name: "Delhi Darbar",
    city: "Delhi",
    area: "Connaught Place",
    avgRating: 4.2,
    totalRatingsString: "856",
    cuisines: ["Mughlai", "North Indian"],
    costForTwo: "₹600",
    address: "Connaught Place, New Delhi",
    veg: "No"
  },
  {
    id: "3",
    name: "Chennai Express",
    city: "Chennai",
    area: "Anna Nagar",
    avgRating: 4.0,
    totalRatingsString: "723",
    cuisines: ["South Indian", "Andhra"],
    costForTwo: "₹500",
    address: "Anna Nagar, Chennai",
    veg: "Yes"
  },
  {
    id: "4",
    name: "Tandoori Nights",
    city: "Bangalore",
    area: "Koramangala",
    avgRating: 4.3,
    totalRatingsString: "967",
    cuisines: ["North Indian", "Biryani"],
    costForTwo: "₹700",
    address: "Koramangala, Bangalore",
    veg: "No"
  },
  {
    id: "5",
    name: "Kolkata Kitchen",
    city: "Kolkata",
    area: "Park Street",
    avgRating: 4.1,
    totalRatingsString: "645",
    cuisines: ["Bengali", "Street Food"],
    costForTwo: "₹400",
    address: "Park Street, Kolkata",
    veg: "No"
  },
  {
    id: "6",
    name: "Punjabi Palace",
    city: "Mumbai",
    area: "Andheri West",
    avgRating: 3.9,
    totalRatingsString: "521",
    cuisines: ["North Indian", "Punjabi"],
    costForTwo: "₹650",
    address: "Andheri West, Mumbai",
    veg: "No"
  },
  {
    id: "7",
    name: "Dosa Delight",
    city: "Bangalore",
    area: "Indiranagar",
    avgRating: 4.4,
    totalRatingsString: "1.5K",
    cuisines: ["South Indian", "Kerala"],
    costForTwo: "₹350",
    address: "Indiranagar, Bangalore",
    veg: "Yes"
  },
  {
    id: "8",
    name: "Royal Rajasthan",
    city: "Jaipur",
    area: "Civil Lines",
    avgRating: 4.6,
    totalRatingsString: "789",
    cuisines: ["Rajasthani", "North Indian"],
    costForTwo: "₹900",
    address: "Civil Lines, Jaipur",
    veg: "No"
  },
  {
    id: "9",
    name: "Hyderabad House",
    city: "Hyderabad",
    area: "Jubilee Hills",
    avgRating: 4.7,
    totalRatingsString: "2.3K",
    cuisines: ["Hyderabadi", "Biryani"],
    costForTwo: "₹600",
    address: "Jubilee Hills, Hyderabad",
    veg: "No"
  },
  {
    id: "10",
    name: "Gujarat Gujarati",
    city: "Ahmedabad",
    area: "CG Road",
    avgRating: 4.0,
    totalRatingsString: "623",
    cuisines: ["Gujarati", "Thali"],
    costForTwo: "₹450",
    address: "CG Road, Ahmedabad",
    veg: "Yes"
  },
  {
    id: "11",
    name: "Delhi Belly",
    city: "Delhi",
    area: "Karol Bagh",
    avgRating: 3.8,
    totalRatingsString: "421",
    cuisines: ["North Indian", "Street Food"],
    costForTwo: "₹300",
    address: "Karol Bagh, New Delhi",
    veg: "No"
  },
  {
    id: "12",
    name: "Mumbai Masala",
    city: "Mumbai",
    area: "Juhu",
    avgRating: 4.2,
    totalRatingsString: "934",
    cuisines: ["Street Food", "Coastal"],
    costForTwo: "₹400",
    address: "Juhu, Mumbai",
    veg: "No"
  }
];

// Sample reviews
export const SAMPLE_REVIEWS: Review[] = [
  {
    id: "1",
    restaurantId: "1",
    userId: "1",
    userName: "Demo User",
    rating: 5,
    comment: "Amazing food and ambiance! The butter chicken was to die for.",
    date: "2023-05-15"
  },
  {
    id: "2",
    restaurantId: "1",
    userId: "2",
    userName: "John Smith",
    rating: 4,
    comment: "Great food but service was a bit slow.",
    date: "2023-06-20"
  },
  {
    id: "3",
    restaurantId: "2",
    userId: "1",
    userName: "Demo User",
    rating: 4,
    comment: "Authentic Delhi taste. Loved the kebabs!",
    date: "2023-04-10"
  },
  {
    id: "4",
    restaurantId: "5",
    userId: "1",
    userName: "Demo User",
    rating: 5,
    comment: "Best Bengali food I've had outside of my home.",
    date: "2023-03-25"
  }
];

// Define the hard-coded list of 82 Ahmedabad areas
export const AHMEDABAD_AREAS = [
  "Acher", "Ahmedabad", "Akhbar Nagar Circle", "Ambavadi", "Ambawadi", "Bapunagar", "Bhadra", "Bodakdev", "CG Road",
  "Chandkheda", "Chanakyapuri", "Danilimda", "Drive In Road", "Dudheshwar", "Ellisbridge", "Ghodasar", "Ghatlodia",
  "Gidc Naroda", "Girdhar Nagar", "Gomtipur", "Gulbai Tekra", "Gurukul", "Hatkeshwar", "Isanpur", "Jashoda Nagar",
  "Jivraj Park", "Jodhpur Cross Road", "Jodhpur Tekra", "Jodhpur Village", "Juhapura", "Kalupur", "Kankaria", "Khadia",
  "Khamasa", "Khanpur", "Khokhra", "Kuber Nagar", "Lal Darwaja", "LalDarwaja", "Madhupura", "Mahadev Nagar Tekra",
  "Maninagar", "Memnagar", "Motera", "Narayana Nagar", "Naranpura", "Naroda", "Narolgam", "Nava Naroda",
  "Nava Vadaj", "Navjivan", "Navrangpura", "Nehrunagar", "Noble Nagar Tenament", "Odhav", "Old Wadaj", "Paldi",
  "Paldi & Ambawadi", "Panjarapole Cross Road", "Prahlad Nagar", "Raikhad", "Ramdev Nagar", "Ranip", "SARKHEJ ROAD",
  "Sardar Colony", "Satellite", "Saijpur Bogha", "Shah-E-Alam Roja", "Shahpur", "Sherkotda", "Shyamal",
  "Sindhu Bhavan Road", "Thaltej", "University Area", "Usmanpura", "Vasna", "Vastral", "Vastrapur", "Vatva", "Vishala"
];

// CSV data URL - updated to point to the correct CSV for real implementation
export const CSV_DATA_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStuLJ4w3zvfNCD2UXXFJ8g84s9rXJ_Xiy5WwSG0VVGNSt9G6nNgmOLzFxNs1VexknxWUZC6r4bzeEH/pub?gid=321987652&single=true&output=csv";

// Store the loaded data cache
let restaurantCache: Restaurant[] | null = null;

// Function to get all restaurants with an option to clear cache
export const getAllRestaurants = async (clearCache = false): Promise<Restaurant[]> => {
  if (clearCache || !restaurantCache) {
    console.log("[Data Service] Clearing cache and fetching fresh restaurant data");
    restaurantCache = await loadRestaurantData();
  }
  return restaurantCache;
};

// Get all unique areas from restaurants
export const getAllAreas = async (): Promise<string[]> => {
  const restaurants = await getAllRestaurants();
  const areas = restaurants.map(restaurant => restaurant.area);
  return [...new Set(areas)].sort();
};

// Get all unique cuisines from restaurants
export const getAllCuisines = async (): Promise<string[]> => {
  const restaurants = await getAllRestaurants();
  const cuisinesArray = restaurants.flatMap(restaurant => restaurant.cuisines);
  return [...new Set(cuisinesArray)].sort();
};

// Function to get paginated restaurants with filtering
export const getPaginatedRestaurants = async (
  page: number,
  limit: number,
  filters?: {
    area?: string;
    cuisine?: string;
    budget?: string;
    searchQuery?: string;
    vegFilter?: string;
  }
): Promise<{ restaurants: Restaurant[]; totalPages: number; totalCount: number }> => {
  console.log(`[Data Service] Fetching page ${page} with limit ${limit} and filters:`, filters);
  
  // Get all restaurants
  const allRestaurants = await getAllRestaurants();
  
  // Apply filters (if any)
  let filteredRestaurants = [...allRestaurants];
  
  if (filters) {
    // Area filter - ensure we're matching exactly with the area property
    if (filters.area && filters.area !== 'all_areas') {
      console.log(`[Data Service] Filtering by area: ${filters.area}`);
      filteredRestaurants = filteredRestaurants.filter(
        restaurant => restaurant.area === filters.area
      );
    }
    
    // Cuisine filter
    if (filters.cuisine && filters.cuisine !== 'all_cuisines') {
      console.log(`[Data Service] Filtering by cuisine: ${filters.cuisine}`);
      filteredRestaurants = filteredRestaurants.filter(
        restaurant => restaurant.cuisines.includes(filters.cuisine)
      );
    }
    
    // Budget filter
    if (filters.budget && filters.budget !== 'all_budgets') {
      console.log(`[Data Service] Filtering by budget: ${filters.budget}`);
      const [minStr, maxStr] = filters.budget.replace('₹', '').split('-');
      const min = parseInt(minStr);
      const max = maxStr ? parseInt(maxStr) : Infinity;
      
      filteredRestaurants = filteredRestaurants.filter(restaurant => {
        const cost = parseInt(restaurant.costForTwo.replace('₹', ''));
        return cost >= min && cost <= max;
      });
    }
    
    // Veg/Non-veg filter
    if (filters.vegFilter && filters.vegFilter !== 'all') {
      console.log(`[Data Service] Filtering by veg: ${filters.vegFilter}`);
      filteredRestaurants = filteredRestaurants.filter(
        restaurant => restaurant.veg === filters.vegFilter
      );
    }
    
    // Search query
    if (filters.searchQuery) {
      console.log(`[Data Service] Searching for: ${filters.searchQuery}`);
      const searchLower = filters.searchQuery.toLowerCase();
      filteredRestaurants = filteredRestaurants.filter(
        restaurant =>
          restaurant.name.toLowerCase().includes(searchLower) ||
          restaurant.area.toLowerCase().includes(searchLower) ||
          restaurant.cuisines.some(cuisine =>
            cuisine.toLowerCase().includes(searchLower)
          )
      );
    }
  }

  // Get the paginated results
  const { restaurants: paginatedResults, totalPages } = paginateRestaurants(
    filteredRestaurants,
    page,
    limit
  );
  
  console.log(`[Data Service] Found ${filteredRestaurants.length} restaurants after filtering, returning page ${page} with ${paginatedResults.length} results`);
  
  // Return the results
  return {
    restaurants: paginatedResults,
    totalPages,
    totalCount: filteredRestaurants.length
  };
};

// Function to get a specific restaurant by ID
export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const restaurants = await getAllRestaurants();
  const restaurant = restaurants.find(restaurant => restaurant.id === id);
  
  if (!restaurant) {
    throw new Error(`Restaurant with ID ${id} not found`);
  }
  
  return restaurant;
};

// Function to get reviews for a specific restaurant
export const getReviewsByRestaurantId = (restaurantId: string): Review[] => {
  // For demo purposes, return some sample reviews
  return SAMPLE_REVIEWS.filter(review => review.restaurantId === restaurantId);
};

// Function to add a new review
export const addReview = (review: Omit<Review, 'id' | 'date'>): Review => {
  const newReview: Review = {
    ...review,
    id: (SAMPLE_REVIEWS.length + 1).toString(),
    date: new Date().toISOString().split('T')[0]
  };
  
  SAMPLE_REVIEWS.push(newReview);
  
  return newReview;
};

// Function to get recommended restaurants for a user
export const getRecommendedRestaurants = async (userId: string): Promise<Restaurant[]> => {
  const restaurants = await getAllRestaurants();
  
  // Get user's favorite restaurants - This would come from actual user data
  const user = { id: userId, favorites: ["1", "5", "10"] };
  
  // For simplicity, return the top 5 rated restaurants
  return restaurants
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 5);
};
