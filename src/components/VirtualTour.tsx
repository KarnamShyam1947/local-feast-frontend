import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import restaurantKitchen from "@/assets/restaurant-kitchen.jpg";

const VirtualTour = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentView, setCurrentView] = useState("kitchen");

  const tourViews = [
    {
      id: "kitchen",
      name: "Main Kitchen",
      description: "Watch our chefs prepare your meals with fresh ingredients",
      image: restaurantKitchen,
    },
    {
      id: "prep",
      name: "Prep Station", 
      description: "See how we maintain the highest hygiene standards",
      image: restaurantKitchen,
    },
    {
      id: "packaging",
      name: "Packaging Area",
      description: "Food safety and quality packaging process",
      image: restaurantKitchen,
    },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Virtual Kitchen Tour
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a virtual tour of our kitchens and see how your food is prepared with the highest standards of quality and hygiene.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Virtual Tour Viewer */}
          <div className="relative">
            <Card className="overflow-hidden shadow-large">
              <div className="relative aspect-video">
                <img 
                  src={tourViews.find(view => view.id === currentView)?.image}
                  alt="Virtual kitchen tour"
                  className="w-full h-full object-cover"
                />
                
                {/* Play/Pause Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button
                    variant="glass"
                    size="xl"
                    onClick={handlePlayPause}
                    className="text-white"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </Button>
                </div>

                {/* Live Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    LIVE
                  </Badge>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    variant="glass"
                    size="icon"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  <Button
                    variant="glass"
                    size="icon"
                  >
                    <Maximize className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* View Progress */}
            <div className="mt-4 flex justify-center gap-2">
              {tourViews.map((view) => (
                <button
                  key={view.id}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentView === view.id ? "w-8 bg-primary" : "w-2 bg-muted"
                  }`}
                  onClick={() => setCurrentView(view.id)}
                />
              ))}
            </div>
          </div>

          {/* Tour Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Transparency in Every Step
              </h3>
              <p className="text-muted-foreground text-lg">
                We believe in complete transparency. Watch our professional chefs prepare your 
                meals in real-time and see the care that goes into every dish.
              </p>
            </div>

            <div className="grid gap-4">
              {tourViews.map((view) => (
                <Card 
                  key={view.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                    currentView === view.id ? "ring-2 ring-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setCurrentView(view.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        currentView === view.id ? "bg-primary text-white" : "bg-muted"
                      }`}>
                        <Eye className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{view.name}</h4>
                        <p className="text-sm text-muted-foreground">{view.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted/50 p-6 rounded-xl">
              <h4 className="font-semibold text-foreground mb-3">Quality Assurance</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>HACCP Certified Kitchen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Fresh Ingredients Daily</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Temperature Controlled Environment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Trained Professional Chefs</span>
                </div>
              </div>
            </div>

            <Button variant="cta" size="lg" className="w-full">
              <Play className="w-5 h-5 mr-2" />
              Start Virtual Tour
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;