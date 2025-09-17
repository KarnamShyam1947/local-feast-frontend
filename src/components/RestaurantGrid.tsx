import { useState } from "react";
import { Star, Clock, MapPin, Heart, ChefHat, Truck, Eye, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroFood from "@/assets/hero-food.jpg";
import deliveryService from "@/assets/delivery-service.jpg";
import groceries from "@/assets/groceries.jpg";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  distance: number;
  image: string;
  isOpen: boolean;
  specialOffers: string[];
  chef: string;
  description: string;
  priceRange: string;
  features: string[];
}

const RestaurantGrid = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<string[]>([]);

  const restaurants: Restaurant[] = [
    {
      id: "1",
      name: "Artisan Pizza Kitchen",
      cuisine: "Italian",
      rating: 4.8,
      reviewCount: 324,
      deliveryTime: "25-35 min",
      deliveryFee: 0,
      distance: 1.2,
      image: heroFood,
      isOpen: true,
      specialOffers: ["Free Delivery", "20% Off"],
      chef: "Chef Marco Rossi",
      description: "Authentic wood-fired pizzas made with imported Italian ingredients",
      priceRange: "₹₹₹",
      features: ["Vegan Options", "Gluten Free", "Late Night"]
    },
    {
      id: "2",
      name: "Fresh Market Express",
      cuisine: "Groceries",
      rating: 4.6,
      reviewCount: 892,
      deliveryTime: "15-25 min",
      deliveryFee: 29,
      distance: 0.8,
      image: groceries,
      isOpen: true,
      specialOffers: ["Fresh Guarantee"],
      chef: "Local Farmers",
      description: "Farm-fresh vegetables, fruits and daily essentials",
      priceRange: "₹₹",
      features: ["Organic", "Local Produce", "Quick Delivery"]
    },
    {
      id: "3",
      name: "Express Delivery Hub",
      cuisine: "Multi-Cuisine",
      rating: 4.7,
      reviewCount: 567,
      deliveryTime: "10-20 min",
      deliveryFee: 0,
      distance: 2.1,
      image: deliveryService,
      isOpen: true,
      specialOffers: ["Express Delivery", "No Delivery Fee"],
      chef: "Multiple Chefs",
      description: "Lightning fast delivery from multiple restaurant partners",
      priceRange: "₹₹",
      features: ["24/7 Available", "Multiple Cuisines", "Express Service"]
    },
  ];

  const toggleFavorite = (restaurantId: string) => {
    setFavorites(prev => 
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
    <Card className={`group hover:shadow-large transition-all duration-500 hover:-translate-y-2 cursor-pointer food-card overflow-hidden ${
      viewMode === "list" ? "flex flex-row" : ""
    }`}>
      <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
            viewMode === "list" ? "w-full h-full" : "w-full h-48"
          }`}
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant={restaurant.isOpen ? "default" : "destructive"}
            className={`${restaurant.isOpen ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {restaurant.isOpen ? "Open" : "Closed"}
          </Badge>
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-white/30"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(restaurant.id);
          }}
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              favorites.includes(restaurant.id) 
                ? "fill-red-500 text-red-500" 
                : "text-white hover:text-red-500"
            }`} 
          />
        </Button>

        {/* Special Offers */}
        {restaurant.specialOffers.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {restaurant.specialOffers.slice(0, 2).map((offer, index) => (
              <Badge key={index} className="bg-accent text-accent-foreground text-xs">
                {offer}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <CardContent className={`${viewMode === "list" ? "flex-1" : ""} p-4`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-muted-foreground text-sm">{restaurant.cuisine}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-foreground">{restaurant.rating}</span>
              <span className="text-muted-foreground text-sm">({restaurant.reviewCount})</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {restaurant.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.distance} km</span>
            </div>
            <div className="flex items-center space-x-1">
              <Truck className="w-4 h-4" />
              <span>{restaurant.deliveryFee === 0 ? "Free" : `₹${restaurant.deliveryFee}`}</span>
            </div>
          </div>
          <span className="font-medium text-foreground">{restaurant.priceRange}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <ChefHat className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{restaurant.chef}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {restaurant.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="cta" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            View Menu
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Featured Restaurants
          <span className="block text-sm font-normal text-muted-foreground mt-1">
            {restaurants.length} restaurants available
          </span>
        </h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Restaurant Grid/List */}
      <div className={`${
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
      } animate-fade-in`}>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg" className="px-12">
          Load More Restaurants
        </Button>
      </div>
    </div>
  );
};

export default RestaurantGrid;