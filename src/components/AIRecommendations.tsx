import { useState, useEffect } from "react";
import { Brain, Star, Clock, TrendingUp, Heart, ChefHat, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import multiCuisine from "@/assets/multi-cuisine.jpg";
import heroBanner from "@/assets/hero-banner.jpg";
import restaurantKitchen from "@/assets/restaurant-kitchen.jpg";

interface Recommendation {
  id: string;
  name: string;
  reason: string;
  image: string;
  rating: number;
  price: number;
  cookTime: string;
  category: string;
  matchScore: number;
  dietaryTags: string[];
  popularity: "trending" | "popular" | "new";
}

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    cuisine: "Italian",
    budget: "medium",
    dietaryRestrictions: ["vegetarian"],
    previousOrders: ["pizza", "pasta", "salad"],
  });

  const mockRecommendations: Recommendation[] = [
    {
      id: "1",
      name: "Truffle Mushroom Pizza",
      reason: "Based on your love for Italian cuisine and previous pizza orders",
      image: multiCuisine,
      rating: 4.8,
      price: 449,
      cookTime: "25-30 min",
      category: "Italian",
      matchScore: 95,
      dietaryTags: ["Vegetarian", "Premium"],
      popularity: "trending",
    },
    {
      id: "2", 
      name: "Mediterranean Quinoa Bowl",
      reason: "Perfect for your vegetarian preference and health-conscious choices",
      image: heroBanner,
      rating: 4.7,
      price: 329,
      cookTime: "15-20 min",
      category: "Healthy",
      matchScore: 92,
      dietaryTags: ["Vegan", "Gluten-Free", "Protein-Rich"],
      popularity: "popular",
    },
    {
      id: "3",
      name: "Artisan Pasta Primavera",
      reason: "Trending among users with similar taste preferences",
      image: restaurantKitchen,
      rating: 4.9,
      price: 389,
      cookTime: "20-25 min",
      category: "Italian",
      matchScore: 88,
      dietaryTags: ["Vegetarian", "Fresh Herbs"],
      popularity: "new",
    },
  ];

  useEffect(() => {
    // Simulate AI processing delay
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getPopularityIcon = (popularity: string) => {
    switch (popularity) {
      case "trending":
        return <TrendingUp className="w-4 h-4" />;
      case "popular":
        return <Heart className="w-4 h-4" />;
      case "new":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "trending":
        return "bg-red-500";
      case "popular":
        return "bg-pink-500";
      case "new":
        return "bg-purple-500";
      default:
        return "bg-blue-500";
    }
  };

  if (recommendations.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                AI is Analyzing Your Preferences
              </h3>
              <p className="text-muted-foreground">
                Our AI is learning from your past orders and preferences to suggest the perfect meals for you.
              </p>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              AI-Powered Recommendations
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our smart algorithm analyzes your preferences, order history, and trending items to suggest meals you'll love.
          </p>
        </div>

        {/* User Preference Summary */}
        <Card className="mb-8 bg-white/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <ChefHat className="w-5 h-5 mr-2 text-primary" />
              Your Taste Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-primary text-primary">
                Prefers {userPreferences.cuisine}
              </Badge>
              <Badge variant="outline" className="border-secondary text-secondary">
                {userPreferences.budget} budget
              </Badge>
              {userPreferences.dietaryRestrictions.map((restriction) => (
                <Badge key={restriction} variant="outline" className="border-accent text-accent">
                  {restriction}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((item, index) => (
            <Card 
              key={item.id} 
              className="group hover:shadow-large transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Match Score */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-primary text-white font-bold">
                    {item.matchScore}% Match
                  </Badge>
                </div>

                {/* Popularity Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={`${getPopularityColor(item.popularity)} text-white`}>
                    {getPopularityIcon(item.popularity)}
                    <span className="ml-1 capitalize">{item.popularity}</span>
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-foreground">{item.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">₹{item.price}</div>
                  </div>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-muted-foreground italic">
                    <Brain className="w-4 h-4 inline mr-1 text-primary" />
                    "{item.reason}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.cookTime}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.category}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.dietaryTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="cta" className="w-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Learning Note */}
        <Card className="mt-12 bg-gradient-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Getting Smarter Every Order</h3>
            <p className="text-muted-foreground text-sm">
              Our AI learns from your feedback and orders to provide increasingly accurate recommendations. 
              The more you order, the better we understand your taste!
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIRecommendations;