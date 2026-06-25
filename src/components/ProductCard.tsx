import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from '@/hooks/use-toast';
import productPlaceholder from '@/assets/product-placeholder.jpg';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  colors?: string[];
  isNew?: boolean;
}

const cleanImage = (image: string) => {
  if (!image || image.startsWith("data:")) return "";
  return image;
};

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  rating = 4.5,
  reviewCount = 0,
  colors = [],
  isNew = false,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, canUseWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        id,
        name,
        price,
        image: cleanImage(image),
        size: 'M',
        color: colors[0] || 'Default'
      });
      toast({
        title: "Added to cart!",
        description: `${name} has been added to your cart.`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive"
      });
    }
  };

  const handleWishlistToggle = async () => {
    if (!canUseWishlist) {
      toast({
        title: "Login required",
        description: "Please log in to use the wishlist feature.",
        variant: "destructive",
      });
      return;
    }
    try {
      if (isWishlisted) {
        await removeFromWishlist(id);
        toast({ title: "Removed from wishlist", description: `${name} removed.` });
      } else {
        await addToWishlist(id, { name, price, image, originalPrice, discount });
        toast({ title: "Added to wishlist!", description: `${name} added.` });
      }
    } catch (error: any) {
      toast({ title: "Error", description: "Wishlist update failed.", variant: "destructive" });
    }
  };

  return (
    // ✨ Glassmorphism Wrapper with Sharp Neon Transitions
    <div className="group relative bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.03] hover:border-purple-500/30">
      
      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-gray-950/50">
        <Link to={`/products/${id}`}>
          <img
            src={cleanImage(image) || productPlaceholder}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.src = productPlaceholder; }}
          />
        </Link>
        
        {/* Absolute Tags */}
        <div className="absolute top-3 left-3 space-y-1 z-10">
          {isNew && (
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none shadow-md">New</Badge>
          )}
          {discount && (
            <Badge className="bg-pink-600 text-white border-none shadow-md">{discount}% OFF</Badge>
          )}
        </div>

        {/* Floating Heart Switch */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 w-8 h-8 p-0 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-xl border border-white/10 text-white transition-all z-10"
          onClick={handleWishlistToggle}
        >
          <Heart 
            size={16} 
            className={isWishlisted ? "fill-pink-500 text-pink-500" : "text-gray-300 group-hover:text-pink-400"} 
          />
        </Button>
      </div>

      {/* Meta Specs Body */}
      <div className="p-5 relative z-10">
        <Link to={`/products/${id}`}>
          <h3 className="font-semibold text-gray-200 mb-2 hover:text-purple-400 transition-colors tracking-wide truncate">
            {name}
          </h3>
        </Link>
        
        {/* Star Engine Component */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(rating) ? "fill-yellow-500 text-yellow-500" : "text-white/10"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-light">({reviewCount})</span>
        </div>

        {/* Dynamic Theme Color Spec Badges */}
        {colors.length > 0 && (
          <div className="flex space-x-1.5 mb-4">
            {colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            {colors.length > 4 && (
              <span className="text-[10px] text-gray-500 ml-1">+{colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Pricing Segment Matrix */}
        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            £{price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-xs text-gray-600 line-through font-light">
              £{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Neon Active Interactive Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-white/[0.04] hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 border border-white/10 text-gray-200 hover:text-white rounded-xl transition-all duration-300 font-medium group/btn shadow-inner"
          size="sm"
        >
          <ShoppingBag size={15} className="mr-2 group-hover/btn:scale-110 transition-transform" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;