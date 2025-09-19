import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Star, Truck, Search, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import FoodCarousel from "@/components/FoodCarousel";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import LocationDetector from "@/components/LocationDetector";
import heroFood from "@/assets/hero-food.jpg";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userLocation, setUserLocation] = useState<string>("Detecting location...");

  const handleLocationUpdate = (location: string, coordinates?: { lat: number; lng: number }) => {
    setUserLocation(location);
  };

  const heroSlides = [
    {
      title: "Fresh Food & Groceries",
      subtitle: "Delivered Fast",
      description: "Your neighborhood cloud kitchen serving delicious meals and fresh groceries within 15km radius. Fast, fresh, and always on time.",
      image: heroFood
    }
  ];

  useEffect(() => {
    // Auto-rotate hero slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    // Simulate location detection
    const detectLocation = () => {
      setTimeout(() => {
        setUserLocation("Central Business District");
      }, 2000);
    };

    detectLocation();
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative bg-gradient-hero min-h-[700px] flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float-delayed"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <div className="mb-6">
              <LocationDetector onLocationUpdate={handleLocationUpdate} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
              <span className="block text-secondary-light bg-gradient-text">{heroSlides[currentSlide].subtitle}</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              {heroSlides[currentSlide].description}
            </p>

            {/* Search Bar */}
            <div className="mb-8 max-w-md mx-auto lg:mx-0">
              <SearchAutocomplete 
                onSearch={(query) => {
                  setSearchQuery(query);
                  console.log("Searching for:", query);
                }}
                placeholder="Search for food, groceries..."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="hero" size="lg" className="text-lg px-8 py-3 hover-scale">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order Food Now
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary hover-scale">
                Browse Groceries
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="glass-card bg-white/10 backdrop-blur-sm rounded-xl p-4 hover-scale">
                <Clock className="w-6 h-6 text-secondary-light mx-auto mb-2 animate-pulse" />
                <p className="text-white font-medium">30 Min</p>
                <p className="text-white/80 text-sm">Avg Delivery</p>
              </div>
              <div className="glass-card bg-white/10 backdrop-blur-sm rounded-xl p-4 hover-scale">
                <MapPin className="w-6 h-6 text-secondary-light mx-auto mb-2" />
                <p className="text-white font-medium">15 KM</p>
                <p className="text-white/80 text-sm">Coverage</p>
              </div>
              <div className="glass-card bg-white/10 backdrop-blur-sm rounded-xl p-4 hover-scale">
                <Star className="w-6 h-6 text-secondary-light mx-auto mb-2" />
                <p className="text-white font-medium">4.8★</p>
                <p className="text-white/80 text-sm">Rating</p>
              </div>
              <div className="glass-card bg-white/10 backdrop-blur-sm rounded-xl p-4 hover-scale">
                <Truck className="w-6 h-6 text-secondary-light mx-auto mb-2" />
                <p className="text-white font-medium">Free</p>
                <p className="text-white/80 text-sm">On ₹299+</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in">
            <FoodCarousel />
            
            {/* Floating Cards */}
            <Card className="absolute -bottom-6 -left-6 p-4 glass-card bg-white/95 backdrop-blur-sm shadow-elegant animate-float z-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Fast Delivery</p>
                  <p className="text-sm text-muted-foreground">Track in real-time</p>
                </div>
              </div>
            </Card>
            
            <Card className="absolute top-6 right-6 p-3 glass-card bg-white/90 backdrop-blur-sm shadow-elegant animate-float z-20">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">⭐ 4.8</div>
                <div className="text-xs text-muted-foreground">Customer Rating</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;