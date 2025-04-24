
import { useState, useCallback, useEffect } from 'react';
import { Restaurant } from '@/types';
import { getAllAreas, getAllCuisines, AHMEDABAD_AREAS } from '@/data/restaurants';

interface Filters {
  area: string;
  cuisine: string;
  budget: string;
  searchQuery: string;
  vegFilter: string;
  sortBy: 'name' | 'avgRating' | 'costForTwo';
  sortOrder: 'asc' | 'desc';
}

export function useRestaurantFilters() {
  const [filters, setFilters] = useState<Filters>({
    area: 'all_areas',
    cuisine: 'all_cuisines',
    budget: 'all_budgets',
    searchQuery: '',
    vegFilter: 'all',
    sortBy: 'avgRating',
    sortOrder: 'desc'
  });

  const [areas, setAreas] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        // Use hardcoded AHMEDABAD_AREAS instead of dynamically loading them
        setAreas(AHMEDABAD_AREAS);
        
        // Load cuisines from data
        const fetchedCuisines = await getAllCuisines();
        setCuisines(fetchedCuisines);
      } catch (error) {
        console.error("Error loading filter options:", error);
      }
    };
    
    loadFilterOptions();
  }, []);

  const budgetRanges = ['₹0-500', '₹501-1000', '₹1001-1500', '₹1501+'];
  const vegOptions = ['all', 'Yes', 'No'];

  const filterRestaurants = useCallback((restaurants: Restaurant[]) => {
    return restaurants.filter(restaurant => {
      const matchesArea = filters.area === 'all_areas' || restaurant.area === filters.area;
      const matchesCuisine = filters.cuisine === 'all_cuisines' || restaurant.cuisines.includes(filters.cuisine);
      const costForTwo = parseInt(restaurant.costForTwo.replace('₹', ''));
      
      let matchesBudget = true;
      if (filters.budget !== 'all_budgets') {
        const [min, max] = filters.budget.replace('₹', '').split('-').map(Number);
        matchesBudget = max ? 
          (costForTwo >= min && costForTwo <= max) : 
          (costForTwo >= min);
      }
      
      const matchesVeg = filters.vegFilter === 'all' || restaurant.veg === filters.vegFilter;

      const searchLower = filters.searchQuery.toLowerCase();
      const matchesSearch = !filters.searchQuery || 
        restaurant.name.toLowerCase().includes(searchLower) ||
        restaurant.area.toLowerCase().includes(searchLower) ||
        restaurant.cuisines.some(cuisine => 
          cuisine.toLowerCase().includes(searchLower)
        );

      return matchesArea && matchesCuisine && matchesBudget && matchesVeg && matchesSearch;
    }).sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'avgRating':
          comparison = b.avgRating - a.avgRating;
          break;
        case 'costForTwo':
          comparison = parseInt(a.costForTwo.replace('₹', '')) - 
                      parseInt(b.costForTwo.replace('₹', ''));
          break;
      }
      
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filters]);

  return {
    filters,
    setFilters,
    filterRestaurants,
    areas,
    cuisines,
    budgetRanges,
    vegOptions
  };
}
