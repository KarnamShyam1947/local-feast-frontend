import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageCircle, MapPin } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-hero relative">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers in your area. Fresh food, fast delivery, 
            and exceptional service - all from your local cloud kitchen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: +91 98765 43210
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Order
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Call & Order</h3>
              <p className="text-white/80 text-sm">Quick phone orders with instant confirmation</p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
              <p className="text-white/80 text-sm">Easy ordering through WhatsApp messages</p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-6">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Local Service</h3>
              <p className="text-white/80 text-sm">Proud to serve your neighborhood exclusively</p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/90 text-lg mb-4">
              <strong>Opening Hours:</strong> 10:00 AM - 11:00 PM Daily
            </p>
            <p className="text-white/80">
              The first and only delivery service in your area!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;