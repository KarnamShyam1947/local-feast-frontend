import { useState } from "react";
import { MapPin, Check, Clock, Truck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface ServiceZone {
  id: string;
  name: string;
  deliveryTime: string;
  deliveryFee: number;
  isActive: boolean;
  landmarks: string[];
}

const ServiceArea = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const serviceZones: ServiceZone[] = [
    {
      id: "zone1",
      name: "Central Business District",
      deliveryTime: "15-25 min",
      deliveryFee: 0,
      isActive: true,
      landmarks: ["City Mall", "Tech Tower", "Grand Hotel", "Central Park"]
    },
    {
      id: "zone2", 
      name: "Residential Colony A",
      deliveryTime: "20-30 min",
      deliveryFee: 29,
      isActive: true,
      landmarks: ["Green Valley", "Sunrise Apartments", "Community Center", "School District"]
    },
    {
      id: "zone3",
      name: "Tech Park Area",
      deliveryTime: "25-35 min", 
      deliveryFee: 39,
      isActive: true,
      landmarks: ["Innovation Hub", "Tech Campus", "Food Court", "Metro Station"]
    },
    {
      id: "zone4",
      name: "University Campus",
      deliveryTime: "20-30 min",
      deliveryFee: 0,
      isActive: true,
      landmarks: ["Main Campus", "Student Housing", "Library", "Sports Complex"]
    },
    {
      id: "zone5",
      name: "Market District",
      deliveryTime: "30-40 min",
      deliveryFee: 49,
      isActive: true,
      landmarks: ["Main Market", "Wholesale Center", "Bus Terminal", "Old City"]
    },
    {
      id: "zone6",
      name: "Industrial Area",
      deliveryTime: "35-45 min",
      deliveryFee: 59,
      isActive: false,
      landmarks: ["Factory Zone", "Warehouse District", "Port Area"]
    }
  ];

  const checkDeliveryArea = async (location: string) => {
    setIsChecking(true);
    // Simulate API call
    setTimeout(() => {
      const randomZone = serviceZones[Math.floor(Math.random() * serviceZones.length)];
      setSelectedZone(randomZone.id);
      setIsChecking(false);
    }, 1500);
  };

  const handleLocationCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      checkDeliveryArea(searchLocation);
    }
  };

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Service Areas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check if we deliver to your location and see delivery times
          </p>
        </div>

        {/* Location Checker */}
        <Card className="max-w-md mx-auto mb-12 glass-card bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Check Delivery Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLocationCheck} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your address or area name"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full"
              />
              <Button 
                type="submit" 
                variant="cta" 
                className="w-full"
                disabled={isChecking}
              >
                {isChecking ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Checking...
                  </div>
                ) : (
                  "Check Delivery"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Service Zones Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceZones.map((zone) => (
            <Card 
              key={zone.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-large hover:-translate-y-1 ${
                selectedZone === zone.id ? "ring-2 ring-primary shadow-large" : ""
              } ${!zone.isActive ? "opacity-60" : ""}`}
              onClick={() => zone.isActive && setSelectedZone(zone.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">
                      {zone.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{zone.deliveryTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Truck className="w-4 h-4" />
                        <span>{zone.deliveryFee === 0 ? "Free" : `₹${zone.deliveryFee}`}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <Badge 
                      variant={zone.isActive ? "default" : "destructive"}
                      className={zone.isActive ? "bg-green-500" : ""}
                    >
                      {zone.isActive ? (
                        <><Check className="w-3 h-3 mr-1" /> Active</>
                      ) : (
                        <><AlertCircle className="w-3 h-3 mr-1" /> Coming Soon</>
                      )}
                    </Badge>
                    {selectedZone === zone.id && (
                      <Badge variant="outline" className="border-primary text-primary">
                        Selected
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Popular Landmarks:</h4>
                  <div className="flex flex-wrap gap-1">
                    {zone.landmarks.map((landmark, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {landmark}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedZone === zone.id && zone.isActive && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center text-primary text-sm font-medium">
                      <Check className="w-4 h-4 mr-2" />
                      We deliver to this area!
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coverage Info */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto glass-card bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Coverage Information</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">15 KM</div>
                  <div className="text-sm text-muted-foreground">Maximum Radius</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">6</div>
                  <div className="text-sm text-muted-foreground">Service Zones</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">15-45</div>
                  <div className="text-sm text-muted-foreground">Minutes Delivery</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Don't see your area? We're expanding soon! Contact us to request service in your location.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;