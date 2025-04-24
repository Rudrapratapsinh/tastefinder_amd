
import { useState, useEffect } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantFilters } from "./RestaurantFilters";
import { useRestaurantFilters } from "@/hooks/useRestaurantFilters";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { generatePagination } from "@/utils/paginationUtils";
import { Restaurant } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { getPaginatedRestaurants } from "@/data/restaurants";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const RESTAURANTS_PER_PAGE = 8;

export function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const {
    filters,
    setFilters,
    areas,
    cuisines,
    budgetRanges,
    vegOptions
  } = useRestaurantFilters();

  useEffect(() => {
    if (user?.favorites) {
      setFavorites(user.favorites);
    }
  }, [user]);

  const fetchRestaurants = async (refreshCache = false) => {
    setLoading(true);
    
    try {
      console.log(`Fetching page ${currentPage} with filters:`, {
        area: filters.area,
        cuisine: filters.cuisine,
        budget: filters.budget,
        vegFilter: filters.vegFilter,
        searchQuery: filters.searchQuery
      });
      
      const { 
        restaurants: fetchedRestaurants, 
        totalPages: pages,
        totalCount: count 
      } = await getPaginatedRestaurants(
        currentPage, 
        RESTAURANTS_PER_PAGE, 
        {
          area: filters.area !== 'all_areas' ? filters.area : undefined,
          cuisine: filters.cuisine !== 'all_cuisines' ? filters.cuisine : undefined,
          budget: filters.budget !== 'all_budgets' ? filters.budget : undefined,
          vegFilter: filters.vegFilter !== 'all' ? filters.vegFilter : undefined,
          searchQuery: filters.searchQuery || undefined
        }
      );
      
      console.log(`Page ${currentPage} fetched ${fetchedRestaurants.length} restaurants`);
      if (fetchedRestaurants.length > 0) {
        console.log('Sample restaurant:', fetchedRestaurants[0]);
      }
      
      setRestaurants(fetchedRestaurants);
      setTotalPages(pages);
      setTotalCount(count);

      if (refreshCache) {
        toast({
          title: "Data refreshed",
          description: "Restaurant data has been refreshed from the source.",
          duration: 3000
        });
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      toast({
        title: "Error",
        description: "Failed to load restaurants. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [currentPage, filters]);

  const handleRefreshData = async () => {
    setRefreshing(true);
    // Force a refresh of the cache
    await fetchRestaurants(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = (restaurantId: string) => {
    if (!user) return;
    
    let updatedFavorites: string[];
    
    if (favorites.includes(restaurantId)) {
      updatedFavorites = favorites.filter(id => id !== restaurantId);
    } else {
      updatedFavorites = [...favorites, restaurantId];
    }
    
    setFavorites(updatedFavorites);
    
    if (user) {
      user.favorites = updatedFavorites;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = () => {
    setFilters(prev => {
      const nextSortBy = prev.sortBy === 'avgRating' 
        ? 'costForTwo' 
        : prev.sortBy === 'costForTwo' 
          ? 'name' 
          : 'avgRating';
          
      const nextSortOrder = nextSortBy === prev.sortBy 
        ? (prev.sortOrder === 'asc' ? 'desc' : 'asc')
        : 'desc';
        
      return {
        ...prev,
        sortBy: nextSortBy as any,
        sortOrder: nextSortOrder as any
      };
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <RestaurantFilters
          areas={areas}
          cuisines={cuisines}
          budgetRanges={budgetRanges}
          vegOptions={vegOptions}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: RESTAURANTS_PER_PAGE }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-40 rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <RestaurantFilters
            areas={areas}
            cuisines={cuisines}
            budgetRanges={budgetRanges}
            vegOptions={vegOptions}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefreshData}
          disabled={refreshing}
          className="ml-2"
        >
          <RefreshCcw size={16} className={`mr-1 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {restaurants.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map(restaurant => (
              <RestaurantCard 
                key={restaurant.id} 
                restaurant={restaurant}
                isFavorite={favorites.includes(restaurant.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            Showing {restaurants.length} restaurants out of {totalCount}
            {filters.area !== 'all_areas' && <span> in {filters.area}</span>}
            {filters.vegFilter !== 'all' && <span>, {filters.vegFilter === 'Yes' ? 'veg only' : 'non-veg'}</span>}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {generatePagination(currentPage, totalPages).map((page, i) => (
                    <PaginationItem key={i}>
                      {page === "..." ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink 
                          isActive={currentPage === page}
                          onClick={() => handlePageChange(page as number)}
                          className={currentPage === page 
                            ? "bg-food-orange text-white hover:bg-food-orange/90 border-food-orange cursor-pointer" 
                            : "cursor-pointer"}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No restaurants found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
}
