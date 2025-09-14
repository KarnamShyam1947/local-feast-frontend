import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RestaurantCardProps {
  id: string;
  name: string;
  cuisine: string;
  image_url?: string;
  rating: number;
  delivery_time: string;
  delivery_fee: number;
  distance?: string;
  is_open: boolean;
  featured_items?: string[];
}

export const RestaurantCard = ({
  id,
  name,
  cuisine,
  image_url,
  rating,
  delivery_time,
  delivery_fee,
  distance,
  is_open,
  featured_items = [],
}: RestaurantCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <Card 
      className="restaurant-card glass-card bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group"
      onClick={handleClick}
    >
      <div className="relative">
        {image_url ? (
          <div className="aspect-[16/9] overflow-hidden">
            <img 
              src={image_url} 
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-subtle flex items-center justify-center">
            <div className="text-muted-foreground">No image available</div>
          </div>
        )}
        
        {!is_open && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded-lg">
              Closed
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {cuisine}
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-lg text-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {rating.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        
        {featured_items.length > 0 && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
            {featured_items.join(' • ')}
          </p>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {delivery_time}
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Truck className="w-4 h-4" />
              ${delivery_fee.toFixed(2)}
            </div>
            
            {distance && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {distance}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};