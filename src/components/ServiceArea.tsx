import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Truck, Phone } from "lucide-react";
import deliveryService from "@/assets/delivery-service.jpg";

const ServiceArea = () => {
  const areas = [
    "Central Business District",
    "Residential Colony A",
    "Tech Park Area", 
    "University Campus",
    "Market District",
    "New Town Development",
    "Industrial Area",
    "Green Valley",
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              We Deliver Across Your Neighborhood
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Proudly serving a 15km radius with the fastest delivery in the area. 
              No other delivery service covers our region - we're here to fill that gap!
            </p>

            <Card className="mb-8 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Coverage Area</h3>
                    <p className="text-muted-foreground">15 kilometer radius delivery zone</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {areas.map((area, index) => (
                    <div key={index} className="text-sm text-muted-foreground bg-white rounded-lg p-2 text-center">
                      {area}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Fast Delivery</h4>
                <p className="text-sm text-muted-foreground">30 minutes average</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Free Delivery</h4>
                <p className="text-sm text-muted-foreground">On orders above ₹299</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Live Tracking</h4>
                <p className="text-sm text-muted-foreground">Real-time updates</p>
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full md:w-auto">
              Check if we deliver to you
            </Button>
          </div>

          <div className="relative">
            <img 
              src={deliveryService} 
              alt="Food delivery service in your neighborhood" 
              className="rounded-2xl shadow-large w-full h-[500px] object-cover"
            />
            <Card className="absolute top-6 right-6 p-4 bg-white shadow-large">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15km</div>
                <div className="text-sm text-muted-foreground">Delivery Radius</div>
              </div>
            </Card>
            <Card className="absolute bottom-6 left-6 p-4 bg-white shadow-large">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-sm font-medium text-foreground">Currently delivering</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;