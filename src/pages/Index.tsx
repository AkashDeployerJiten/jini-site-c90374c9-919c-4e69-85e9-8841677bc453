import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import SizeGuide from '@/components/SizeGuide';
import ShippingInfo from '@/components/ShippingInfo';
import Contact from '@/components/Contact';
import { useProducts } from '@/contexts/ProductsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    // 🌌 Deep dark space aesthetic background
    <div className="min-h-screen bg-[#090a0f] text-gray-100 overflow-x-hidden relative">
      
      {/* ✨ CYBER GLOW ORBS: Piche diffuse hokar chamakne waale dynamic colorful circles */}
      <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[5%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none" />

      <Header />
      
      {/* 🚀 Glassmorphic Hero Section */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 flex items-center justify-center z-10">
        <div className="max-w-4xl w-full mx-auto px-6 py-16 text-center bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent mb-6">
            Minimal Fashion
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our collection of premium t-shirts crafted with care and attention to detail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-300 hover:scale-105 border border-white/10">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 👕 Featured Products Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12 border-b border-white/[0.05] pb-4">
            <h2 className="text-3xl font-bold tracking-wide text-white">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="transition-all duration-300 hover:scale-[1.03]">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  image={product.image}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  colors={product.colors.map(c => c.value)}
                  isNew={product.isNew}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✉️ Newsletter Form with Frosted Glass Overlay */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-xl border border-white/[0.06] rounded-[2rem] p-10 md:p-16 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto font-light">
            Subscribe to get notified about new products and exclusive offers
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/[0.02] border-white/10 text-white rounded-xl focus:border-purple-500 focus:ring-purple-500/20 placeholder:text-gray-600"
              disabled={isSubscribing}
            />
            <Button 
              type="submit"
              className="bg-white text-black hover:bg-gray-200 font-semibold rounded-xl px-8 shadow-lg transition-all"
              disabled={isSubscribing}
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </section>

      {/* 🏢 Dark Matrix Footer */}
      <footer className="bg-[#050609] border-t border-white/[0.05] py-16 relative z-10 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 bg-[#050609] rounded-full"></div>
                </div>
                <span className="text-xl font-bold text-white tracking-wider">Loom & Co.</span>
              </div>
              <p className="text-gray-500 font-light text-sm">
                Premium t-shirts for the modern lifestyle
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/products" className="hover:text-purple-400 transition-colors">All Products</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    Size Guide
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowShippingInfo(true)}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    Shipping
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4 tracking-wide text-sm uppercase">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => setShowContact(true)}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/[0.05] mt-16 pt-8 text-center text-xs text-gray-600 tracking-wider">
            <p>&copy; 2024 Loom & Co. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals Containers */}
      <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
      <ShippingInfo isOpen={showShippingInfo} onClose={() => setShowShippingInfo(false)} />
      <Contact isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
};

export default Index;