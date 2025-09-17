import { useState } from "react";
import { Search, Filter, MapPin, Clock, Star, DollarSign, Leaf, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SearchFilters {
  query: string;
  cuisine: string;
  priceRange: number[];
  deliveryTime: string;
  rating: number;
  dietary: string[];
  sortBy: string;
}

const AdvancedSearch = ({ onSearch }: { onSearch: (filters: SearchFilters) => void }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    cuisine: "all",
    priceRange: [0, 1000],
    deliveryTime: "all",
    rating: 0,
    dietary: [],
    sortBy: "relevance",
  });

  const cuisineTypes = [
    { value: "all", label: "All Cuisines" },
    { value: "italian", label: "Italian" },
    { value: "indian", label: "Indian" },
    { value: "chinese", label: "Chinese" },
    { value: "mexican", label: "Mexican" },
    { value: "japanese", label: "Japanese" },
    { value: "american", label: "American" },
    { value: "thai", label: "Thai" },
  ];

  const deliveryTimeOptions = [
    { value: "all", label: "Any Time" },
    { value: "15", label: "Under 15 min" },
    { value: "30", label: "Under 30 min" },
    { value: "45", label: "Under 45 min" },
    { value: "60", label: "Under 1 hour" },
  ];

  const dietaryOptions = [
    { value: "vegetarian", label: "Vegetarian", icon: Leaf },
    { value: "vegan", label: "Vegan", icon: Leaf },
    { value: "gluten-free", label: "Gluten Free", icon: ChefHat },
    { value: "dairy-free", label: "Dairy Free", icon: ChefHat },
    { value: "nut-free", label: "Nut Free", icon: ChefHat },
  ];

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "delivery-time", label: "Fastest Delivery" },
    { value: "popularity", label: "Most Popular" },
  ];

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      dietary: checked 
        ? [...prev.dietary, dietary]
        : prev.dietary.filter(d => d !== dietary)
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const resetFilters = () => {
    setFilters({
      query: "",
      cuisine: "all",
      priceRange: [0, 1000],
      deliveryTime: "all",
      rating: 0,
      dietary: [],
      sortBy: "relevance",
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Cuisine Filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block flex items-center">
          <ChefHat className="w-4 h-4 mr-2" />
          Cuisine Type
        </label>
        <Select value={filters.cuisine} onValueChange={(value) => setFilters(prev => ({ ...prev, cuisine: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select cuisine" />
          </SelectTrigger>
          <SelectContent>
            {cuisineTypes.map((cuisine) => (
              <SelectItem key={cuisine.value} value={cuisine.value}>
                {cuisine.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block flex items-center">
          <DollarSign className="w-4 h-4 mr-2" />
          Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
        </label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
          max={1000}
          min={0}
          step={50}
          className="w-full"
        />
      </div>

      {/* Delivery Time */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Delivery Time
        </label>
        <Select value={filters.deliveryTime} onValueChange={(value) => setFilters(prev => ({ ...prev, deliveryTime: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select delivery time" />
          </SelectTrigger>
          <SelectContent>
            {deliveryTimeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block flex items-center">
          <Star className="w-4 h-4 mr-2" />
          Minimum Rating: {filters.rating}★
        </label>
        <Slider
          value={[filters.rating]}
          onValueChange={([value]) => setFilters(prev => ({ ...prev, rating: value }))}
          max={5}
          min={0}
          step={0.5}
          className="w-full"
        />
      </div>

      {/* Dietary Preferences */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block flex items-center">
          <Leaf className="w-4 h-4 mr-2" />
          Dietary Preferences
        </label>
        <div className="space-y-3">
          {dietaryOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={filters.dietary.includes(option.value)}
                onCheckedChange={(checked) => handleDietaryChange(option.value, checked as boolean)}
              />
              <label htmlFor={option.value} className="text-sm text-foreground flex items-center">
                <option.icon className="w-4 h-4 mr-2 text-primary" />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Sort By
        </label>
        <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button onClick={handleSearch} className="flex-1 bg-gradient-primary">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for restaurants, dishes, or ingredients..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            className="pl-12 h-12 text-lg bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-primary transition-all duration-300"
          />
        </div>
        <Button onClick={handleSearch} size="lg" className="bg-gradient-primary px-8">
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
        
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="lg" className="md:hidden">
              <Filter className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Search Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <Card className="hidden md:block bg-white/95 backdrop-blur-sm border-2 border-muted">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
            </span>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FilterContent />
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Display */}
      {(filters.cuisine !== "all" || filters.dietary.length > 0 || filters.rating > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.cuisine !== "all" && (
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {cuisineTypes.find(c => c.value === filters.cuisine)?.label}
            </span>
          )}
          {filters.dietary.map(dietary => (
            <span key={dietary} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
              {dietaryOptions.find(d => d.value === dietary)?.label}
            </span>
          ))}
          {filters.rating > 0 && (
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              {filters.rating}★ & above
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;