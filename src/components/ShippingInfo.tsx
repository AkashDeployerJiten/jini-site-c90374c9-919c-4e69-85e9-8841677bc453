import { X, Truck, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ShippingInfoProps { isOpen: boolean; onClose: () => void; }

const ShippingInfo = ({ isOpen, onClose }: ShippingInfoProps) => {
  const shippingOptions = [
    { name: 'Standard Delivery', time: '3-5 business days', price: 'Free', icon: <Truck className="w-5 h-5 text-blue-400" /> },
    { name: 'Express Delivery', time: '1-2 business days', price: '£4.99', icon: <Clock className="w-5 h-5 text-amber-400" /> },
    { name: 'Next Day Delivery', time: 'Next business day', price: '£9.99', icon: <MapPin className="w-5 h-5 text-emerald-400" /> }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#0f111a]/95 backdrop-blur-2xl border border-white/[0.08] text-white rounded-3xl shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-white/[0.05] pb-3">
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Shipping Logistics</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"><X size={18} /></Button>
        </DialogHeader>
        <div className="space-y-5 pt-3">
          <div className="space-y-3">
            {shippingOptions.map((option, index) => (
              <div key={index} className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-purple-500/20 transition-all">
                <div className="flex items-center space-x-3">
                  {option.icon}
                  <div>
                    <p className="font-medium text-sm text-gray-200">{option.name}</p>
                    <p className="text-xs text-gray-400">{option.time}</p>
                  </div>
                </div>
                <span className="font-semibold text-sm text-purple-400">{option.price}</span>
              </div>
            ))}
          </div>
          <div className="bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl text-xs text-gray-400 space-y-2">
            <p className="font-medium text-gray-200">System Logs & Parameters:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 font-light">
              <li>Free automated tier routing above threshold metrics (£50).</li>
              <li>Processing cutoff lock window drops exactly at 2 PM daily.</li>
              <li>Delivery schedules calculate business cycles, omitting holidays.</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShippingInfo;