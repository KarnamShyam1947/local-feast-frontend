import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Star, Truck } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Fresh Food & Groceries
              <span className="block text-secondary-light">Delivered Fast</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Your neighborhood cloud kitchen serving delicious meals and fresh groceries 
              within 15km radius. Fast, fresh, and always on time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="hero" size="lg" className="text-lg px-8 py-3">
                Order Food Now
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                Browse Groceries
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Clock className="w-6 h-6 text-secondary-light mx-auto mb-2" />
                <p className="text-white font-medium">30 Min</p>
                <p className="text-white/80 text-sm">Delivery</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <MapPin className="w-6 h-6 text-secondary-light mx-auto mb-2" />
                <p className="text-white font-medium">15 KM</p>
                <p className="text-white/80 text-sm">Coverage</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Star className="w-6 h-6 text-secondary-light mx-auto mb-2" />
                <p className="text-white font-medium">4.8★</p>
                <p className="text-white/80 text-sm">Rating</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Truck className="w-6 h-6 text-secondary-light mx-auto mb-2" />
                <p className="text-white font-medium">Free</p>
                <p className="text-white/80 text-sm">Delivery</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <img 
              src={heroFood} 
              alt="Fresh food and groceries ready for delivery" 
              className="rounded-2xl shadow-large w-full h-[500px] object-cover"
            />
            <Card className="absolute -bottom-6 -left-6 p-4 bg-white shadow-large">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Fast Delivery</p>
                  <p className="text-sm text-muted-foreground">Track your order in real-time</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;