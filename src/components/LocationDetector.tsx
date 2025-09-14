import { useState, useEffect } from "react";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface LocationDetectorProps {
  onLocationUpdate: (location: string, coordinates?: { lat: number; lng: number }) => void;
}

const LocationDetector = ({ onLocationUpdate }: LocationDetectorProps) => {
  const [currentLocation, setCurrentLocation] = useState<string>("Detecting location...");
  const [manualLocation, setManualLocation] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);

  const serviceAreas = [
    "Central Business District",
    "Residential Colony A", 
    "Tech Park Area",
    "University Campus",
    "Market District",
    "New Town Development",
    "Industrial Area",
    "Green Valley"
  ];

  useEffect(() => {
    detectCurrentLocation();
  }, []);

  const detectCurrentLocation = () => {
    setIsDetecting(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setCurrentLocation("Location not available");
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Simulate reverse geocoding
        setTimeout(() => {
          const detectedArea = serviceAreas[Math.floor(Math.random() * serviceAreas.length)];
          setCurrentLocation(detectedArea);
          onLocationUpdate(detectedArea, { lat: latitude, lng: longitude });
          setIsDetecting(false);
        }, 2000);
      },
      (error) => {
        console.error("Error detecting location:", error);
        setError("Unable to detect your location");
        setCurrentLocation("Location not available");
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleManualLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      setCurrentLocation(manualLocation);
      onLocationUpdate(manualLocation);
      setShowManualInput(false);
      setManualLocation("");
    }
  };

  const selectServiceArea = (area: string) => {
    setCurrentLocation(area);
    onLocationUpdate(area);
    setShowManualInput(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-foreground font-medium">
            {isDetecting ? (
              <span className="flex items-center">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                Detecting location...
              </span>
            ) : (
              currentLocation
            )}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={detectCurrentLocation}
            disabled={isDetecting}
            className="hover-scale"
          >
            <Navigation className="w-4 h-4 mr-1" />
            Detect
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowManualInput(!showManualInput)}
            className="hover-scale"
          >
            Change
          </Button>
        </div>
      </div>

      {error && (
        <Card className="p-3 bg-destructive/10 border-destructive/20 animate-fade-in">
          <div className="flex items-center space-x-2 text-destructive">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </Card>
      )}

      {showManualInput && (
        <Card className="p-4 glass-card bg-white/95 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleManualLocationSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Enter your location
              </label>
              <Input
                type="text"
                placeholder="Type your address or area name"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Or select from our service areas:</p>
              <div className="grid grid-cols-2 gap-2">
                {serviceAreas.map((area, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectServiceArea(area)}
                    className="text-left p-2 text-sm bg-muted/50 hover:bg-muted rounded-lg transition-colors hover-scale"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" variant="cta" size="sm" className="flex-1">
                Update Location
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowManualInput(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default LocationDetector;