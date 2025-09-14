import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { FoodCard } from '@/components/FoodCard';
import { RestaurantCard } from '@/components/RestaurantCard';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Grid, List, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  preparation_time?: number;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  category_id?: string;
}

const Menu = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock restaurant data
  const restaurants = [
    {
      id: '1',
      name: 'Bella Italia',
      cuisine: 'Italian',
      image_url: '/placeholder-restaurant.jpg',
      rating: 4.8,
      delivery_time: '25-35 min',
      delivery_fee: 2.99,
      distance: '1.2 km',
      is_open: true,
      featured_items: ['Pizza Margherita', 'Pasta Carbonara', 'Tiramisu']
    },
    {
      id: '2',
      name: 'Spice Garden',
      cuisine: 'Indian',
      image_url: '/placeholder-restaurant.jpg',
      rating: 4.6,
      delivery_time: '30-40 min',
      delivery_fee: 1.99,
      distance: '2.1 km',
      is_open: true,
      featured_items: ['Butter Chicken', 'Biryani', 'Naan']
    },
    {
      id: '3',
      name: 'Fresh & Green',
      cuisine: 'Healthy',
      image_url: '/placeholder-restaurant.jpg',
      rating: 4.7,
      delivery_time: '20-30 min',
      delivery_fee: 2.49,
      distance: '0.8 km',
      is_open: false,
      featured_items: ['Buddha Bowl', 'Green Smoothie', 'Quinoa Salad']
    }
  ];

  useEffect(() => {
    fetchFoodItems();
    fetchCategories();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const { data, error } = await supabase
        .from('food_items')
        .select('*')
        .eq('is_available', true);

      if (error) throw error;
      setFoodItems(data || []);
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredItems = foodItems
    .filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category_id === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'time':
          return (a.preparation_time || 30) - (b.preparation_time || 30);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Header />
        <div className="container mx-auto px-4 pt-32">
          <div className="text-center text-white">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading delicious food...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-12">
        {/* Search and Location */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing Food
          </h1>
          <p className="text-white/90 text-lg mb-6">
            Order from the best restaurants in your area
          </p>
          
          <div className="max-w-2xl mx-auto mb-6">
            <SearchAutocomplete 
              onSearch={handleSearch}
              placeholder="Search for food, restaurants..."
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Delivering to Central Business District</span>
          </div>
        </div>

        {/* Tabs for Restaurants and Food */}
        <Tabs defaultValue="restaurants" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-card bg-white/20 backdrop-blur-sm">
            <TabsTrigger value="restaurants" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary">
              Restaurants
            </TabsTrigger>
            <TabsTrigger value="food" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary">
              All Food
            </TabsTrigger>
          </TabsList>

          <TabsContent value="restaurants" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="food" className="space-y-6">
            {/* Filters and Controls */}
            <div className="glass-card bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="text-sm">
                    {filteredItems.length} items
                  </Badge>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="time">Preparation Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="hover-scale"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="hover-scale"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Food Items Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="glass-card bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
                  <Filter className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No items found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'md:grid-cols-1 lg:grid-cols-2'
              }`}>
                {filteredItems.map((item) => (
                  <FoodCard key={item.id} {...item} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Menu;