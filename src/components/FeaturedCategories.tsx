import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Pizza, 
  Sandwich, 
  Coffee, 
  Apple, 
  ShoppingCart, 
  Clock,
  Heart,
  Zap
} from "lucide-react";
import deliveryService from "@/assets/delivery-service.jpg";
import groceries from "@/assets/groceries.jpg";

const FeaturedCategories = () => {
  const foodCategories = [
    { icon: Pizza, name: "Pizza & Italian", count: "25+ items", color: "bg-red-100 text-red-600" },
    { icon: Sandwich, name: "Burgers & Wraps", count: "18+ items", color: "bg-orange-100 text-orange-600" },
    { icon: Coffee, name: "Beverages", count: "30+ items", color: "bg-amber-100 text-amber-600" },
    { icon: Apple, name: "Healthy Bowls", count: "15+ items", color: "bg-green-100 text-green-600" },
  ];

  const features = [
    {
      icon: Clock,
      title: "Quick Delivery",
      description: "Fresh food delivered in 30 minutes or less",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish prepared fresh in our cloud kitchen",
    },
    {
      icon: Zap,
      title: "Zero Contact",
      description: "Safe, contactless delivery to your doorstep",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We Deliver
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From hot, fresh meals to daily groceries - we've got everything you need delivered fast
          </p>
        </div>

        {/* Food Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {foodCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-medium transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Grocery & Service Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Fresh Groceries & Daily Essentials
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Skip the trip to the store! Get fresh vegetables, fruits, dairy products, 
              and pantry essentials delivered alongside your favorite meals.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-foreground">Farm-fresh vegetables and fruits</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-foreground">Daily dairy and bakery items</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-foreground">Pantry essentials and snacks</span>
              </div>
            </div>
            <Button variant="cta" size="lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Shop Groceries
            </Button>
          </div>
          <div className="relative">
            <img 
              src={groceries} 
              alt="Fresh groceries and vegetables" 
              className="rounded-2xl shadow-large w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;