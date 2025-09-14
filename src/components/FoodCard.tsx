import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Leaf, Plus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  preparation_time?: number;
  is_vegetarian?: boolean;
  is_vegan?: boolean;
  rating?: number;
  restaurant_name?: string;
  restaurant_id?: string;
}

export const FoodCard = ({
  id,
  name,
  description,
  price,
  image_url,
  preparation_time = 30,
  is_vegetarian,
  is_vegan,
  rating = 4.5,
  restaurant_name,
  restaurant_id,
}: FoodCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image_url,
      restaurant_name,
      restaurant_id,
    });
  };

  return (
    <Card className="food-card glass-card bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      <div className="relative">
        {image_url ? (
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={image_url} 
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-gradient-subtle flex items-center justify-center">
            <div className="text-muted-foreground text-sm">No image available</div>
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex gap-1">
          {is_vegan && (
            <Badge variant="secondary" className="bg-green-500/90 text-white text-xs">
              <Leaf className="w-3 h-3 mr-1" />
              Vegan
            </Badge>
          )}
          {is_vegetarian && !is_vegan && (
            <Badge variant="secondary" className="bg-green-400/90 text-white text-xs">
              <Leaf className="w-3 h-3 mr-1" />
              Vegetarian
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-lg text-xs">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {rating.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg leading-tight">{name}</h3>
          <span className="text-primary font-bold text-lg">${price.toFixed(2)}</span>
        </div>

        {restaurant_name && (
          <p className="text-sm text-muted-foreground mb-2">{restaurant_name}</p>
        )}

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {preparation_time} min
          </div>

          <Button 
            onClick={handleAddToCart}
            size="sm" 
            className="bg-gradient-primary hover:opacity-90 hover-scale"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};