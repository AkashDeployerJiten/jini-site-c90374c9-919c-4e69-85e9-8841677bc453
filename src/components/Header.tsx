import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const { items } = useCart();
  const { wishlistItems } = useWishlist();

  const getTotalItems = () => {
    return items ? items.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    // 🌌 Ultra-Premium Dark Glassmorphic Navigation Bar
    <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          {/* 💎 Glowing Cyber Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-violet-600">
              Loom & Co.
            </span>
          </Link>

          {/* Desktop Navigation Slot */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Shop</Link>
          </nav>

          {/* Right side icons with notifications glow tags */}
          <div className="flex items-center space-x-4 text-white">
            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/10"> 
                <Heart size={20} className="hover:text-pink-500 transition-colors" />
                {wishlistItems && wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/10"> 
                <ShoppingBag size={20} className="hover:text-violet-400 transition-colors" />      
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="relative text-white hover:bg-white/10"
                onClick={() => setProfileOpen((open) => !open)}
              >
                <User size={20} />
              </Button>
              
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-2xl bg-black/90 backdrop-blur-lg border border-white/10 z-50">
                  <ul className="py-1">
                    <li>
                      <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-white/10 text-gray-200" onClick={() => setProfileOpen(false)}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="flex items-center px-4 py-2 hover:bg-white/10 text-gray-200" onClick={() => setProfileOpen(false)}>
                        Orders
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/products" className="text-sm font-medium text-gray-300 hover:text-white px-2 py-1 transition-colors" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;