import { useState } from "react";
import { ArrowRight, Download, Bell, Gift, Star, Smartphone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const CallToAction = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const handleAppNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      // Handle app download link
      setPhone("");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        
        {/* Main CTA Hero */}
        <div className="text-center mb-16">
          <Card className="max-w-4xl mx-auto glass-card bg-gradient-primary text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>
            
            <CardContent className="p-12 relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Gift className="w-4 h-4 mr-2" />
                  Limited Time Offer
                </Badge>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Get 50% Off Your First Order!
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Download our app and enjoy lightning-fast delivery with exclusive discounts
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download App
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg"
                >
                  Order Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>15 min delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span>4.8 rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5" />
                  <span>Track live</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter & App Download */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Newsletter Signup */}
          <Card className="glass-card bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground">
                  Get notified about new restaurants, special offers, and exclusive deals
                </p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-center"
                  required
                />
                <Button 
                  type="submit" 
                  variant="cta" 
                  className="w-full"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <Star className="w-4 h-4 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                No spam, unsubscribe anytime. Join 10,000+ food lovers!
              </p>
            </CardContent>
          </Card>

          {/* App Download */}
          <Card className="glass-card bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Get the App
                </h3>
                <p className="text-muted-foreground">
                  Download our mobile app for faster ordering and exclusive app-only deals
                </p>
              </div>
              
              <form onSubmit={handleAppNotification} className="space-y-4">
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-center"
                />
                <Button type="submit" variant="cta" className="w-full">
                  Send Download Link
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </form>
              
              <div className="flex justify-center space-x-4 mt-6">
                <div className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                  📱 App Store
                </div>
                <div className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                  🤖 Google Play
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center glass-card bg-white/95 backdrop-blur-sm hover:shadow-large transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-foreground mb-2">Lightning Fast</h4>
              <p className="text-sm text-muted-foreground">
                Average delivery time of just 25 minutes to your doorstep
              </p>
            </CardContent>
          </Card>

          <Card className="text-center glass-card bg-white/95 backdrop-blur-sm hover:shadow-large transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-foreground mb-2">Top Rated</h4>
              <p className="text-sm text-muted-foreground">
                4.8-star average rating from thousands of satisfied customers
              </p>
            </CardContent>
          </Card>

          <Card className="text-center glass-card bg-white/95 backdrop-blur-sm hover:shadow-large transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-foreground mb-2">Great Deals</h4>
              <p className="text-sm text-muted-foreground">
                Regular discounts, combo offers, and loyalty rewards
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;