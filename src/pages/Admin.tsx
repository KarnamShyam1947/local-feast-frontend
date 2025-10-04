// import { useEffect, useState } from 'react';
// import { useAuth } from '@/components/auth/AuthProvider';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from '@/hooks/use-toast';
// import { Plus, Edit, Trash2, Package } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// interface FoodItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image_url: string;
//   category_id: string;
//   categories: { name: string };
// }

// interface Category {
//   id: string;
//   name: string;
// }

// const Admin = () => {
//   const { user, isAdmin } = useAuth();
//   const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     image_url: '',
//     category_id: '',
//   });

//   useEffect(() => {
//     if (isAdmin) {
//       fetchFoodItems();
//       fetchCategories();
//     }
//   }, [isAdmin]);

//   const fetchFoodItems = async () => {
//     const { data, error } = await supabase
//       .from('food_items')
//       .select(`
//         *,
//         categories (name)
//       `)
//       .order('created_at', { ascending: false });

//     if (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch food items",
//         variant: "destructive",
//       });
//     } else {
//       setFoodItems(data || []);
//     }
//   };

//   const fetchCategories = async () => {
//     const { data, error } = await supabase
//       .from('categories')
//       .select('*')
//       .order('name');

//     if (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch categories",
//         variant: "destructive",
//       });
//     } else {
//       setCategories(data || []);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const itemData = {
//       name: formData.name,
//       description: formData.description,
//       price: parseFloat(formData.price),
//       image_url: formData.image_url,
//       category_id: formData.category_id,
//     };

//     if (editingItem) {
//       const { error } = await supabase
//         .from('food_items')
//         .update(itemData)
//         .eq('id', editingItem.id);

//       if (error) {
//         toast({
//           title: "Error",
//           description: "Failed to update item",
//           variant: "destructive",
//         });
//       } else {
//         toast({ title: "Success", description: "Item updated successfully" });
//         setEditingItem(null);
//         fetchFoodItems();
//       }
//     } else {
//       const { error } = await supabase
//         .from('food_items')
//         .insert([itemData]);

//       if (error) {
//         toast({
//           title: "Error",
//           description: "Failed to add item",
//           variant: "destructive",
//         });
//       } else {
//         toast({ title: "Success", description: "Item added successfully" });
//         setIsAddDialogOpen(false);
//         fetchFoodItems();
//       }
//     }

//     setFormData({
//       name: '',
//       description: '',
//       price: '',
//       image_url: '',
//       category_id: '',
//     });
//   };

//   const handleDelete = async (id: string) => {
//     const { error } = await supabase
//       .from('food_items')
//       .delete()
//       .eq('id', id);

//     if (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete item",
//         variant: "destructive",
//       });
//     } else {
//       toast({ title: "Success", description: "Item deleted successfully" });
//       fetchFoodItems();
//     }
//   };

//   const startEdit = (item: FoodItem) => {
//     setEditingItem(item);
//     setFormData({
//       name: item.name,
//       description: item.description,
//       price: item.price.toString(),
//       image_url: item.image_url,
//       category_id: item.category_id,
//     });
//   };

//   if (!user) {
//     return (
//       <div className="container mx-auto py-8">
//         <Card>
//           <CardContent className="p-8 text-center">
//             <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
//             <p>Please log in to access the admin panel.</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="container mx-auto py-8">
//         <Card>
//           <CardContent className="p-8 text-center">
//             <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
//             <p>You don't have permission to access this page.</p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold flex items-center gap-2">
//           <Package className="h-8 w-8 text-primary" />
//           Admin Dashboard
//         </h1>
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="bg-gradient-primary hover:opacity-90">
//               <Plus className="h-4 w-4 mr-2" />
//               Add Food Item
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Food Item</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="price">Price (₹)</Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   step="0.01"
//                   value={formData.price}
//                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="image_url">Image URL</Label>
//                 <Input
//                   id="image_url"
//                   value={formData.image_url}
//                   onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="category">Category</Label>
//                 <Select
//                   value={formData.category_id}
//                   onValueChange={(value) => setFormData({ ...formData, category_id: value })}
//                   required
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((category) => (
//                       <SelectItem key={category.id} value={category.id}>
//                         {category.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
//                 Add Item
//               </Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {foodItems.map((item) => (
//           <Card key={item.id}>
//             <CardHeader>
//               <img
//                 src={item.image_url}
//                 alt={item.name}
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//             </CardHeader>
//             <CardContent>
//               <CardTitle className="mb-2">{item.name}</CardTitle>
//               <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
//               <p className="text-lg font-bold text-primary mb-2">₹{item.price}</p>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Category: {item.categories.name}
//               </p>
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => startEdit(item)}
//                 >
//                   <Edit className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {editingItem && (
//         <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Edit Food Item</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <Label htmlFor="edit-name">Name</Label>
//                 <Input
//                   id="edit-name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="edit-description">Description</Label>
//                 <Textarea
//                   id="edit-description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="edit-price">Price (₹)</Label>
//                 <Input
//                   id="edit-price"
//                   type="number"
//                   step="0.01"
//                   value={formData.price}
//                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="edit-image_url">Image URL</Label>
//                 <Input
//                   id="edit-image_url"
//                   value={formData.image_url}
//                   onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="edit-category">Category</Label>
//                 <Select
//                   value={formData.category_id}
//                   onValueChange={(value) => setFormData({ ...formData, category_id: value })}
//                   required
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((category) => (
//                       <SelectItem key={category.id} value={category.id}>
//                         {category.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
//                 Update Item
//               </Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default Admin;

import React from 'react'

const Admin = () => {
  return (
    <div>Admin</div>
  )
}

export default Admin