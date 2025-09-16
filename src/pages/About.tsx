import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Users, Utensils, Award, Heart, Leaf, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Average delivery in 30-45 minutes with real-time tracking"
    },
    {
      icon: Users,
      title: "Local Partners",
      description: "Supporting local restaurants and food businesses in our community"
    },
    {
      icon: Utensils,
      title: "Quality Food",
      description: "Curated selection of the best local restaurants and cuisines"
    },
    {
      icon: Award,
      title: "Top Rated",
      description: "4.8/5 star average rating from thousands of satisfied customers"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in supporting local businesses and bringing communities together through food."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Eco-friendly packaging and carbon-neutral delivery options for a greener future."
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "Consistent, on-time delivery with transparent tracking every step of the way."
    },
    {
      icon: Shield,
      title: "Food Safety",
      description: "Strict hygiene standards and temperature-controlled delivery for food safety."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Restaurant Partners" },
    { number: "50,000+", label: "Orders Delivered" },
    { number: "4.8/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            Farm to Table Delivery
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Bringing Fresh Food to Your Door
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            FreshBites is more than just a food delivery service. We're a community-driven platform 
            connecting you with the best local restaurants while supporting sustainable practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
              <Link to="/menu">Explore Menu</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FreshBites?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering not just food, but an exceptional experience every time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-large transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Founded in 2020, FreshBites started with a simple mission: to connect food lovers 
                with local restaurants while supporting sustainable practices. What began as a small 
                local delivery service has grown into a thriving community platform.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that great food brings people together, and local businesses are the 
                heart of every community. That's why we've partnered with over 500 local restaurants, 
                from family-owned gems to innovative new eateries.
              </p>
              <Button asChild className="bg-gradient-primary hover:opacity-90">
                <Link to="/menu">Start Ordering</Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/600/400" 
                alt="Fresh local ingredients" 
                className="rounded-xl shadow-large w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-primary/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from restaurant partnerships to delivery practices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-card bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-large transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-primary p-3 rounded-lg">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience Fresh Food Delivery?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FreshBites for their daily food needs.
          </p>
          <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
            <Link to="/menu">Order Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;