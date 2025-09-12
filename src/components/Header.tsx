import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">FK</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FreshKitchen</h1>
              <p className="text-xs text-muted-foreground">Cloud Kitchen & Delivery</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Serving 15km radius</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">10:00 AM - 11:00 PM</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+91 98765 43210</span>
            </div>
          </div>

          <Button variant="cta" size="lg">
            Order Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;