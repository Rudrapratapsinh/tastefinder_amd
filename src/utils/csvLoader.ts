
import { Restaurant } from "@/types";
import { SAMPLE_RESTAURANTS, CSV_DATA_URL } from "@/data/restaurants";

// Helper function to parse CSV data
const parseCSV = (csvText: string): Restaurant[] => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  
  // Create an array of restaurants from the CSV data
  const restaurants: Restaurant[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    // Skip empty lines
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    
    // Skip rows that don't have enough values
    if (values.length < 8) {
      console.warn(`Skipping row ${i} due to insufficient values:`, values);
      continue;
    }
    
    // Ensure veg value is either "Yes" or "No"
    const vegValue = values[8]?.trim() || "";
    const normalizedVeg: "Yes" | "No" = vegValue === "Yes" ? "Yes" : "No";
    
    // Extract values
    const restaurant: Restaurant = {
      id: `resto-${i}`,
      name: values[0]?.trim() || "",
      city: values[1]?.trim() || "",
      area: values[2]?.trim() || "",
      avgRating: parseFloat(values[3]) || 0,
      totalRatingsString: values[4]?.trim() || "0",
      cuisines: values[5]?.split('|').map(c => c.trim()) || [],
      costForTwo: values[6]?.trim() || "₹0",
      address: values[7]?.trim() || "",
      veg: normalizedVeg
    };
    
    // Only include restaurants from Ahmedabad
    if (restaurant.city.toLowerCase() === "ahmedabad") {
      restaurants.push(restaurant);
    }
  }
  
  console.log(`[CSV Loader] Parsed ${restaurants.length} restaurants from Ahmedabad`);
  
  return restaurants;
};

// Fetch the CSV data and parse it
export async function loadRestaurantData(): Promise<Restaurant[]> {
  console.log(`[CSV Loader] Fetching data from: ${CSV_DATA_URL}`);
  
  try {
    // Attempt to fetch the CSV data
    const response = await fetch(CSV_DATA_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    console.log(`[CSV Loader] Fetched CSV data (${csvText.length} bytes)`);
    
    // Parse the CSV data
    const restaurants = parseCSV(csvText);
    
    if (restaurants.length === 0) {
      console.warn("[CSV Loader] No restaurants found in CSV data, falling back to sample data");
      return SAMPLE_RESTAURANTS.filter(r => r.city === "Ahmedabad");
    }
    
    console.log(`[CSV Loader] Successfully loaded ${restaurants.length} restaurants from CSV`);
    return restaurants;
  } catch (error) {
    console.error("[CSV Loader] Error fetching or parsing CSV data:", error);
    console.warn("[CSV Loader] Falling back to sample data (filtered for Ahmedabad)");
    return SAMPLE_RESTAURANTS.filter(r => r.city === "Ahmedabad");
  }
}

// Function to get unique areas from restaurant data
export function getUniqueAreas(restaurants: Restaurant[]): string[] {
  const areas = restaurants.map(restaurant => restaurant.area);
  return [...new Set(areas)].sort();
}

// Function to get unique cuisines from restaurant data
export function getUniqueCuisines(restaurants: Restaurant[]): string[] {
  const cuisinesArray = restaurants.flatMap(restaurant => restaurant.cuisines);
  return [...new Set(cuisinesArray)].sort();
}

// Function to paginate restaurant data
export function paginateRestaurants(
  restaurants: Restaurant[],
  page: number,
  limit: number
): { restaurants: Restaurant[]; totalPages: number } {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedRestaurants = restaurants.slice(startIndex, endIndex);
  const totalPages = Math.ceil(restaurants.length / limit);
  
  console.log(`[Pagination] Page ${page}: Offset ${startIndex}, Limit ${limit}, Returning ${paginatedRestaurants.length} restaurants`);
  
  return {
    restaurants: paginatedRestaurants,
    totalPages
  };
}
