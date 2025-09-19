import { useState } from "react";
import { ChevronRight, Utensils, Coffee, Pizza, IceCream, Salad, Cookie } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  popular: boolean;
  estimatedTime: string;
}

const FeaturedCategories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: "main-course",
      name: "Main Course",
      description: "Hearty meals and comfort food",
      itemCount: 45,
      icon: <Utensils className="w-8 h-8" />,
      color: "text-orange-600",
      gradient: "from-orange-400 to-red-500",
      popular: true,
      estimatedTime: "25-35 min"
    },
    {
      id: "pizza",
      name: "Pizza & Italian",
      description: "Wood-fired pizzas and pasta",
      itemCount: 28,
      icon: <Pizza className="w-8 h-8" />,
      color: "text-red-600",
      gradient: "from-red-400 to-pink-500",
      popular: true,
      estimatedTime: "20-30 min"
    },
    {
      id: "beverages",
      name: "Beverages",
      description: "Fresh juices and hot drinks",
      itemCount: 32,
      icon: <Coffee className="w-8 h-8" />,
      color: "text-amber-600",
      gradient: "from-amber-400 to-orange-500",
      popular: false,
      estimatedTime: "10-15 min"
    },
    {
      id: "desserts",
      name: "Desserts",
      description: "Sweet treats and ice cream",
      itemCount: 24,
      icon: <IceCream className="w-8 h-8" />,
      color: "text-pink-600",
      gradient: "from-pink-400 to-purple-500",
      popular: true,
      estimatedTime: "15-20 min"
    },
    {
      id: "healthy",
      name: "Healthy Options",
      description: "Salads, smoothies and nutritious meals",
      itemCount: 36,
      icon: <Salad className="w-8 h-8" />,
      color: "text-green-600",
      gradient: "from-green-400 to-emerald-500",
      popular: false,
      estimatedTime: "20-25 min"
    },
    {
      id: "snacks",
      name: "Snacks & Bakery",
      description: "Quick bites and fresh baked goods",
      itemCount: 41,
      icon: <Cookie className="w-8 h-8" />,
      color: "text-yellow-600",
      gradient: "from-yellow-400 to-amber-500",
      popular: true,
      estimatedTime: "15-25 min"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover delicious food organized by your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group cursor-pointer transition-all duration-500 hover:shadow-large hover:-translate-y-2 overflow-hidden"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`h-2 bg-gradient-to-r ${category.gradient}`}></div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  
                  <div className="text-right">
                    {category.popular && (
                      <Badge className="bg-accent text-accent-foreground mb-2">
                        Popular
                      </Badge>
                    )}
                    <div className="text-2xl font-bold text-foreground">
                      {category.itemCount}
                    </div>
                    <div className="text-xs text-muted-foreground">items</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    ⏱️ {category.estimatedTime}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 ${
                      hoveredCategory === category.id ? "translate-x-1" : ""
                    }`}
                  >
                    Browse
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Hover overlay effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-subtle rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-sm text-muted-foreground">Min Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Button variant="cta" size="lg" className="px-8">
            View Full Menu
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;