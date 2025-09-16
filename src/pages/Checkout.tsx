import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, CreditCard, Truck, Clock, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, totalAmount, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    address: '',
    phone: '',
    notes: '',
    paymentMethod: 'card',
    deliveryOption: 'standard',
    tipAmount: 0,
    useContactlessDelivery: false,
    scheduledDelivery: ''
  });

  const deliveryFee = 2.99;
  const serviceFee = 1.50;
  const subtotal = totalAmount;
  const tip = orderData.tipAmount;
  const total = subtotal + deliveryFee + serviceFee + tip;

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place an order.",
        variant: "destructive"
      });
      return;
    }

    // Here you would integrate with your backend to create the order
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been confirmed. You'll receive updates via SMS.",
    });
    
    navigate('/order-tracking');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="glass-card bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-white/80 mb-6">Add some delicious items to your cart before checking out.</p>
            <Button onClick={() => navigate('/menu')} className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30">
              Browse Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/menu')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Review your order and complete your purchase</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Delivery Information */}
            <Card className="glass-card bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-gradient-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full delivery address"
                    value={orderData.address}
                    onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={orderData.phone}
                    onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Delivery Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions for delivery..."
                    value={orderData.notes}
                    onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="contactless"
                    checked={orderData.useContactlessDelivery}
                    onCheckedChange={(checked) => 
                      setOrderData({...orderData, useContactlessDelivery: !!checked})
                    }
                  />
                  <Label htmlFor="contactless">Contactless delivery</Label>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Payment Method */}
            <Card className="glass-card bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-gradient-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={orderData.paymentMethod} 
                  onValueChange={(value) => setOrderData({...orderData, paymentMethod: value})}
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="w-4 h-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="cursor-pointer">UPI Payment</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Step 3: Tip */}
            <Card className="glass-card bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-gradient-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  Add Tip (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[10, 15, 20, 25].map((percentage) => {
                    const amount = (subtotal * percentage) / 100;
                    return (
                      <Button
                        key={percentage}
                        variant={orderData.tipAmount === amount ? "default" : "outline"}
                        className="text-sm"
                        onClick={() => setOrderData({...orderData, tipAmount: amount})}
                      >
                        {percentage}%
                      </Button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="custom-tip">Custom Amount:</Label>
                  <Input
                    id="custom-tip"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-24"
                    onChange={(e) => setOrderData({...orderData, tipAmount: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <Card className="glass-card bg-white/80 backdrop-blur-sm border-white/20 sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      {item.image_url && (
                        <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  {tip > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Tip</span>
                      <span>${tip.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">Estimated delivery: 30-45 mins</span>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-gradient-primary hover:opacity-90"
                  size="lg"
                  disabled={!orderData.address || !orderData.phone}
                >
                  Place Order - ${total.toFixed(2)}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing this order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;