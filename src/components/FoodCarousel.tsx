import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroFood from "@/assets/hero-food.jpg";
import deliveryService from "@/assets/delivery-service.jpg";
import groceries from "@/assets/groceries.jpg";
import heroBanner from "@/assets/hero-banner.jpg";
import restaurantKitchen from "@/assets/restaurant-kitchen.jpg";
import multiCuisine from "@/assets/multi-cuisine.jpg";

const FoodCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Ultimate Food Experience",
      description: "Discover delicious cuisines from top-rated restaurants",
      image: heroBanner,
      chef: "Premium Chefs",
      rating: 4.9,
      prepTime: "25-30 min",
      price: "₹299",
      location: "Multiple Locations",
    },
    {
      id: 2,
      title: "Multi-Cuisine Collection",
      description: "From Italian pizza to Asian delights - all in one place",
      image: multiCuisine,
      chef: "International Chefs",
      rating: 4.8,
      prepTime: "20-35 min",
      price: "₹199",
      location: "Global Kitchen",
    },
    {
      id: 3,
      title: "Fresh Kitchen Experience",
      description: "Professionally prepared meals in state-of-the-art kitchens",
      image: restaurantKitchen,
      chef: "Master Chefs",
      rating: 4.7,
      prepTime: "15-25 min",
      price: "₹349",
      location: "Cloud Kitchen",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-3xl">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 transform translate-x-0"
                : index < currentSlide
                ? "opacity-0 transform -translate-x-full"
                : "opacity-0 transform translate-x-full"
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{slide.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{slide.prepTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-white/90 mb-3">{slide.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{slide.location}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-secondary">{slide.price}</div>
                        <div className="text-xs text-white/80">Starting from</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="glass"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <Button
        variant="glass"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodCarousel;