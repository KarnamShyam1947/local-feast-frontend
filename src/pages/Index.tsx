import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import ServiceArea from "@/components/ServiceArea";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedCategories />
      <ServiceArea />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
