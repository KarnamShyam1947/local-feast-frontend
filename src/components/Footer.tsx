import { MapPin, Phone, Clock, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">FK</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">FreshKitchen</h3>
                <p className="text-xs text-muted-foreground">Cloud Kitchen & Delivery</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your neighborhood's first cloud kitchen delivering fresh food and groceries 
              within 15km radius.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">order@freshkitchen.local</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Serving 15km radius</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">10:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#menu" className="block text-muted-foreground hover:text-primary text-sm transition-colors">Food Menu</a>
              <a href="#groceries" className="block text-muted-foreground hover:text-primary text-sm transition-colors">Groceries</a>
              <a href="#delivery" className="block text-muted-foreground hover:text-primary text-sm transition-colors">Delivery Areas</a>
              <a href="#about" className="block text-muted-foreground hover:text-primary text-sm transition-colors">About Us</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Service Areas</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Central Business District</p>
              <p>Residential Colonies</p>
              <p>Tech Park Area</p>
              <p>University Campus</p>
              <p className="text-primary font-medium">+ Many more locations</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 FreshKitchen. All rights reserved. | The first delivery service in your area!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;