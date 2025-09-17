import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import AdvancedSearch from "@/components/AdvancedSearch";
import RestaurantGrid from "@/components/RestaurantGrid";
import AIRecommendations from "@/components/AIRecommendations";
import VirtualTour from "@/components/VirtualTour";
import ServiceArea from "@/components/ServiceArea";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    // Implement search logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedCategories />
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AdvancedSearch onSearch={handleSearch} />
        </div>
      </section>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <RestaurantGrid />
        </div>
      </section>
      <AIRecommendations />
      <VirtualTour />
      <ServiceArea />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
