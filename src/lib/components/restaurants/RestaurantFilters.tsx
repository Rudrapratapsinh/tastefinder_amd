import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AHMEDABAD_AREAS } from "@/data/restaurants";

interface FiltersProps {
  areas: string[];
  cuisines: string[];
  budgetRanges: string[];
  vegOptions: string[];
  filters: {
    area: string;
    cuisine: string;
    budget: string;
    vegFilter: string;
    searchQuery: string;
    sortBy: string;
    sortOrder: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onSortChange: () => void;
}

export function RestaurantFilters({
  cuisines,
  budgetRanges,
  vegOptions,
  filters,
  onFilterChange,
  onSortChange
}: FiltersProps) {
  // Area filter state for search dropdown
  const [areaSearchOpen, setAreaSearchOpen] = useState(false);
  const [areaQuery, setAreaQuery] = useState("");
  // Add cuisine search dropdown state
  const [cuisineSearchOpen, setCuisineSearchOpen] = useState(false);
  const [cuisineQuery, setCuisineQuery] = useState("");
  const filteredAreas = AHMEDABAD_AREAS.filter(area =>
    area.toLowerCase().includes(areaQuery.toLowerCase())
  );
  // Filtered cuisine list for search
  const filteredCuisines = cuisines.filter(cuisine =>
    cuisine.toLowerCase().includes(cuisineQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants, cuisines, or areas..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            className="pl-9"
            aria-label="Search restaurants"
          />
        </div>
        <Button
          variant="outline"
          onClick={onSortChange}
          className="w-full md:w-auto"
          aria-label={`Sort by ${filters.sortBy} ${filters.sortOrder === 'asc' ? 'ascending' : 'descending'}`}
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by {filters.sortBy}
          ({filters.sortOrder === 'asc' ? '↑' : '↓'})
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Area Filter */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium mb-1">Area</label>
          {areaSearchOpen ? (
            <div className="relative">
              <Input
                autoFocus
                placeholder="Type to search area"
                value={areaQuery}
                onChange={e => setAreaQuery(e.target.value)}
                className="mb-2"
                aria-label="Type to filter areas"
              />
              <div className="max-h-60 overflow-auto border rounded bg-white shadow-lg z-50 absolute w-full mt-1">
                <ul>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        onFilterChange("area", "all_areas");
                        setAreaSearchOpen(false);
                        setAreaQuery("");
                      }}
                    >
                      All Areas
                    </Button>
                  </li>
                  {filteredAreas.map(area => (
                    <li key={area}>
                      <Button
                        variant={filters.area === area ? "default" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => {
                          onFilterChange("area", area);
                          setAreaSearchOpen(false);
                          setAreaQuery("");
                        }}
                      >
                        {area}
                        {filters.area === area && (
                          <span className="ml-2 text-food-orange font-bold">(Selected)</span>
                        )}
                      </Button>
                    </li>
                  ))}
                  {filteredAreas.length === 0 && (
                    <li>
                      <span className="block px-4 py-2 text-muted-foreground">No areas found.</span>
                    </li>
                  )}
                </ul>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={() => {
                  setAreaSearchOpen(false);
                  setAreaQuery("");
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Select
                value={filters.area}
                onValueChange={value => onFilterChange('area', value)}
                aria-label="Filter by area"
              >
                <SelectTrigger className="w-full md:w-[220px]">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_areas">All Areas</SelectItem>
                  {AHMEDABAD_AREAS.map(area => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                variant="default"
                className="text-white"
                onClick={() => setAreaSearchOpen(true)}
                aria-label="Search for an area"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Area
              </Button>
            </div>
          )}
        </div>

        {/* Cuisine Filter */}
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium mb-1">Cuisine</label>
          {cuisineSearchOpen ? (
            <div className="relative">
              <Input
                autoFocus
                placeholder="Type to search cuisine"
                value={cuisineQuery}
                onChange={e => setCuisineQuery(e.target.value)}
                className="mb-2"
                aria-label="Type to filter cuisines"
              />
              <div className="max-h-60 overflow-auto border rounded bg-white shadow-lg z-50 absolute w-full mt-1">
                <ul>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        onFilterChange("cuisine", "all_cuisines");
                        setCuisineSearchOpen(false);
                        setCuisineQuery("");
                      }}
                    >
                      All Cuisines
                    </Button>
                  </li>
                  {filteredCuisines.map(cuisine => (
                    <li key={cuisine}>
                      <Button
                        variant={filters.cuisine === cuisine ? "default" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => {
                          onFilterChange("cuisine", cuisine);
                          setCuisineSearchOpen(false);
                          setCuisineQuery("");
                        }}
                      >
                        {cuisine}
                        {filters.cuisine === cuisine && (
                          <span className="ml-2 text-food-orange font-bold">(Selected)</span>
                        )}
                      </Button>
                    </li>
                  ))}
                  {filteredCuisines.length === 0 && (
                    <li>
                      <span className="block px-4 py-2 text-muted-foreground">No cuisines found.</span>
                    </li>
                  )}
                </ul>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={() => {
                  setCuisineSearchOpen(false);
                  setCuisineQuery("");
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Select
                value={filters.cuisine}
                onValueChange={value => onFilterChange('cuisine', value)}
                aria-label="Filter by cuisine"
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_cuisines">All Cuisines</SelectItem>
                  {cuisines.map(cuisine => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                variant="default"
                className="text-white"
                onClick={() => setCuisineSearchOpen(true)}
                aria-label="Search for a cuisine"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Cuisine
              </Button>
            </div>
          )}
        </div>

        {/* Budget Filter */}
        <Select
          value={filters.budget}
          onValueChange={(value) => onFilterChange('budget', value)}
          aria-label="Filter by budget"
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_budgets">All Budgets</SelectItem>
            {budgetRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Veg/Non-Veg Filter */}
        <Select
          value={filters.vegFilter}
          onValueChange={(value) => onFilterChange('vegFilter', value)}
          aria-label="Filter by veg/non-veg"
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Veg or Non-veg" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Yes">Veg</SelectItem>
            <SelectItem value="No">Non-veg</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
