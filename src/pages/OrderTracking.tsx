import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Clock, 
  Truck, 
  MapPin, 
  Phone, 
  MessageCircle,
  Star,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderTracking = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState(2); // 0: placed, 1: preparing, 2: on the way, 3: delivered
  const [estimatedTime, setEstimatedTime] = useState(25);

  // Simulate order progress
  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const statusSteps = [
    { 
      title: "Order Placed", 
      description: "We've received your order",
      icon: CheckCircle,
      completed: true
    },
    { 
      title: "Preparing Food", 
      description: "Restaurant is preparing your meal",
      icon: Clock,
      completed: true
    },
    { 
      title: "On the Way", 
      description: "Driver is heading to your location",
      icon: Truck,
      completed: orderStatus >= 2
    },
    { 
      title: "Delivered", 
      description: "Enjoy your meal!",
      icon: CheckCircle,
      completed: orderStatus >= 3
    }
  ];

  const orderDetails = {
    orderId: "FB-2024-001234",
    restaurant: "Spice Garden Indian Kitchen",
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 15.99 },
      { name: "Garlic Naan", quantity: 2, price: 3.99 },
      { name: "Mango Lassi", quantity: 1, price: 4.99 }
    ],
    total: 28.96,
    deliveryAddress: "123 Main Street, Apt 4B, Downtown District",
    phone: "+91 98765 43210",
    paymentMethod: "Credit Card ****1234"
  };

  const driverInfo = {
    name: "Raj Kumar",
    phone: "+91 98765 43211",
    rating: 4.8,
    vehicle: "Honda Activa - DL 8C 1234"
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold">Track Your Order</h1>
          <p className="text-muted-foreground">Order #{orderDetails.orderId}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Progress */}
            <Card className="glass-card bg-white/80 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <div className="flex items-center gap-4">
                  <Badge variant={orderStatus >= 3 ? "default" : "secondary"} className="bg-gradient-primary">
                    {orderStatus >= 3 ? "Delivered" : "In Progress"}
                  </Badge>
                  {orderStatus < 3 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      ETA: {estimatedTime} mins
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={(orderStatus + 1) * 25} className="mb-6" />
                
                <div className="space-y-4">
                  {statusSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`rounded-full p-2 ${
                        step.completed 
                          ? 'bg-green-100 text-green-600' 
                          : index === orderStatus + 1 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        {index === 1 && orderStatus >= 1 && (
                          <p className="text-xs text-green-600 mt-1">
                            Started at {new Date().toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Driver Information */}
            {orderStatus >= 2 && (
              <Card className="glass-card bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Your Delivery Driver</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {driverInfo.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{driverInfo.name}</h4>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {driverInfo.rating}
                      </div>
                      <p className="text-sm text-muted-foreground">{driverInfo.vehicle}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Driver
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Live Map Placeholder */}
            {orderStatus >= 2 && (
              <Card className="glass-card bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Live Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">Live map tracking coming soon</p>
                      <p className="text-sm text-muted-foreground">Driver is approximately 0.8 km away</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <Card className="glass-card bg-white/80 backdrop-blur-sm border-white/20 sticky top-4">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">RESTAURANT</h4>
                  <p className="font-medium">{orderDetails.restaurant}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">ITEMS</h4>
                  <div className="space-y-2">
                    {orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">DELIVERY ADDRESS</h4>
                  <p className="text-sm">{orderDetails.deliveryAddress}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">PHONE</h4>
                  <p className="text-sm">{orderDetails.phone}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">PAYMENT</h4>
                  <p className="text-sm">{orderDetails.paymentMethod}</p>
                </div>

                {orderStatus >= 3 && (
                  <Button className="w-full bg-gradient-primary hover:opacity-90" size="lg">
                    Reorder
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;