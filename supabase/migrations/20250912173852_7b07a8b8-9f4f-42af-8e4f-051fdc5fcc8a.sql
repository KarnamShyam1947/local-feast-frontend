-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create food items table
CREATE TABLE public.food_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  is_available BOOLEAN NOT NULL DEFAULT true,
  preparation_time INTEGER DEFAULT 30, -- in minutes
  ingredients TEXT[],
  allergens TEXT[],
  is_vegetarian BOOLEAN DEFAULT false,
  is_vegan BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_latitude DECIMAL(10,8),
  delivery_longitude DECIMAL(11,8),
  phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT DEFAULT 'cash_on_delivery' CHECK (payment_method IN ('cash_on_delivery', 'stripe')),
  estimated_delivery_time TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  food_item_id UUID NOT NULL REFERENCES public.food_items(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for categories (public read, admin write)
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Only admins can manage categories" 
ON public.categories FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Create policies for food items (public read, admin write)
CREATE POLICY "Food items are viewable by everyone" 
ON public.food_items FOR SELECT USING (true);

CREATE POLICY "Only admins can manage food items" 
ON public.food_items FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Create policies for orders
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" 
ON public.orders FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can update all orders" 
ON public.orders FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Create policies for order items
CREATE POLICY "Users can view their own order items" 
ON public.order_items FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid()));

CREATE POLICY "Users can create their own order items" 
ON public.order_items FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid()));

CREATE POLICY "Admins can view all order items" 
ON public.order_items FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_food_items_updated_at BEFORE UPDATE ON public.food_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for orders and order_items
ALTER TABLE public.orders REPLICA IDENTITY FULL;
ALTER TABLE public.order_items REPLICA IDENTITY FULL;
ALTER TABLE public.food_items REPLICA IDENTITY FULL;
ALTER TABLE public.categories REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.food_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;

-- Insert sample categories
INSERT INTO public.categories (name, description, image_url) VALUES
('Main Dishes', 'Delicious main course meals', '/placeholder.svg'),
('Appetizers', 'Perfect starters for your meal', '/placeholder.svg'),
('Desserts', 'Sweet treats to end your meal', '/placeholder.svg'),
('Beverages', 'Refreshing drinks and beverages', '/placeholder.svg'),
('Groceries', 'Fresh groceries and daily essentials', '/placeholder.svg');

-- Insert sample food items
INSERT INTO public.food_items (name, description, price, category_id, preparation_time, is_vegetarian) VALUES
('Chicken Biryani', 'Aromatic basmati rice with tender chicken and spices', 12.99, (SELECT id FROM public.categories WHERE name = 'Main Dishes'), 45, false),
('Vegetable Curry', 'Mixed vegetables cooked in rich curry sauce', 9.99, (SELECT id FROM public.categories WHERE name = 'Main Dishes'), 30, true),
('Samosas', 'Crispy pastry filled with spiced potatoes', 5.99, (SELECT id FROM public.categories WHERE name = 'Appetizers'), 15, true),
('Gulab Jamun', 'Sweet milk dumplings in sugar syrup', 4.99, (SELECT id FROM public.categories WHERE name = 'Desserts'), 10, true),
('Mango Lassi', 'Creamy yogurt drink with fresh mango', 3.99, (SELECT id FROM public.categories WHERE name = 'Beverages'), 5, true);