import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  children?: React.ReactNode;
}

export const Cart = ({ children }: CartProps) => {
  const { items, updateQuantity, removeItem, updateInstructions, totalItems, totalAmount } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="relative hover-scale">
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {totalItems}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button variant="outline" className="mt-4" onClick={() => setOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="glass-card p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      {item.image_url && (
                        <img 
                          src={item.image_url} 
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        {item.restaurant_name && (
                          <p className="text-xs text-muted-foreground">{item.restaurant_name}</p>
                        )}
                        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>

                        {item.special_instructions && (
                          <div className="mt-2">
                            <p className="text-xs font-medium">Special Instructions:</p>
                            <p className="text-xs text-muted-foreground">{item.special_instructions}</p>
                          </div>
                        )}

                        <div className="mt-2">
                          <Textarea
                            placeholder="Special instructions (optional)"
                            value={item.special_instructions || ''}
                            onChange={(e) => updateInstructions(item.id, e.target.value)}
                            className="text-xs h-16 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>$1.50</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(totalAmount + 2.99 + 1.50).toFixed(2)}</span>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};