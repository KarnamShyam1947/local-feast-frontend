import { useState } from "react";
import { Plus, Minus, Heart, Clock, Star, Flame, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  preparationTime: number;
  rating: number;
  reviewCount: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  discount?: number;
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface FoodCardProps {
  item: FoodItem;
  variant?: "default" | "compact" | "featured";
}

const FoodCard = ({ item, variant = "default" }: FoodCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart, cartItems } = useCart();

  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const discountedPrice = item.discount 
    ? item.price - (item.price * item.discount / 100)
    : item.price;

  if (variant === "compact") {
    return (
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-large hover:-translate-y-1 overflow-hidden">
        <div className="flex">
          <div className="relative w-24 h-24 flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            {item.isPopular && (
              <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs">
                Hot
              </Badge>
            )}
          </div>
          
          <CardContent className="flex-1 p-3">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {item.name}
              </h4>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={toggleFavorite}
              >
                <Heart className={`w-3 h-3 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs">
                <span className="font-bold text-foreground">₹{discountedPrice}</span>
                {item.discount && (
                  <span className="text-muted-foreground line-through">₹{item.price}</span>
                )}
              </div>
              
              <Button variant="cta" size="sm" className="h-6 px-2 text-xs" onClick={handleAddToCart}>
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`group cursor-pointer transition-all duration-500 hover:shadow-large hover:-translate-y-2 overflow-hidden food-card ${
      variant === "featured" ? "md:col-span-2" : ""
    }`}>
      <div className="relative">
        <div className={`relative overflow-hidden ${variant === "featured" ? "h-64" : "h-48"}`}>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse"></div>
          )}
          <img 
            src={item.image} 
            alt={item.name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {item.isPopular && (
            <Badge className="bg-accent text-accent-foreground">
              <Flame className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {item.isVegetarian && (
            <Badge variant="outline" className="bg-green-500/90 text-white border-green-500">
              <Leaf className="w-3 h-3 mr-1" />
              Veg
            </Badge>
          )}
          {item.discount && (
            <Badge className="bg-red-500 text-white">
              {item.discount}% OFF
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-white/30"
          onClick={toggleFavorite}
        >
          <Heart className={`w-5 h-5 transition-colors ${
            isFavorite ? "fill-red-500 text-red-500" : "text-white hover:text-red-500"
          }`} />
        </Button>

        {/* Quick add button (shows on hover) */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button variant="cta" size="sm" onClick={handleAddToCart}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {item.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Rating and time */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{item.rating}</span>
              <span className="text-muted-foreground">({item.reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{item.preparationTime} min</span>
            </div>
          </div>
        </div>

        {/* Dietary indicators */}
        <div className="flex items-center space-x-2 mb-3">
          {item.isVegan && (
            <Badge variant="outline" className="text-xs border-green-500 text-green-600">
              Vegan
            </Badge>
          )}
          {item.isSpicy && (
            <Badge variant="outline" className="text-xs border-red-500 text-red-600">
              <Flame className="w-3 h-3 mr-1" />
              Spicy
            </Badge>
          )}
        </div>

        {/* Nutritional info for featured variant */}
        {variant === "featured" && item.nutritionalInfo && (
          <div className="grid grid-cols-4 gap-2 mb-3 p-2 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="text-xs font-semibold text-foreground">{item.nutritionalInfo.calories}</div>
              <div className="text-xs text-muted-foreground">cal</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold text-foreground">{item.nutritionalInfo.protein}g</div>
              <div className="text-xs text-muted-foreground">protein</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold text-foreground">{item.nutritionalInfo.carbs}g</div>
              <div className="text-xs text-muted-foreground">carbs</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold text-foreground">{item.nutritionalInfo.fat}g</div>
              <div className="text-xs text-muted-foreground">fat</div>
            </div>
          </div>
        )}

        {/* Price and add to cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">₹{discountedPrice}</span>
            {item.discount && (
              <span className="text-sm text-muted-foreground line-through">₹{item.price}</span>
            )}
          </div>
          
          {quantity > 0 ? (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
              <Button variant="cta" size="icon" className="h-8 w-8" onClick={handleAddToCart}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button variant="cta" onClick={handleAddToCart}>
              <Plus className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;