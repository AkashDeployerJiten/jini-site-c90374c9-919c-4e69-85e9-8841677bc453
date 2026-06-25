import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SizeGuideProps { isOpen: boolean; onClose: () => void; }

const SizeGuide = ({ isOpen, onClose }: SizeGuideProps) => {
  const sizeChart = [
    { size: 'XS', chest: '32-34', waist: '26-28', length: '26' },
    { size: 'S', chest: '34-36', waist: '28-30', length: '27' },
    { size: 'M', chest: '36-38', waist: '30-32', length: '28' },
    { size: 'L', chest: '38-40', waist: '32-34', length: '29' },
    { size: 'XL', chest: '40-42', waist: '34-36', length: '30' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#0f111a]/95 backdrop-blur-2xl border border-white/[0.08] text-white rounded-3xl shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-white/[0.05] pb-3">
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Size Matrix</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"><X size={18} /></Button>
        </DialogHeader>
        <div className="space-y-4 pt-3">
          <p className="text-xs text-gray-400 font-light">All dimensional parameters are calibrated in inches.</p>
          <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-black/20">
            <table className="w-full text-xs">
              <thead className="bg-white/[0.03] border-b border-white/[0.06]">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium text-purple-400 uppercase">Size</th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-300 uppercase">Chest</th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-300 uppercase">Waist</th>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-300 uppercase">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-gray-300">
                {sizeChart.map((row) => (
                  <tr key={row.size} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-4 py-2.5 font-bold text-white">{row.size}</td>
                    <td className="px-4 py-2.5 font-light">{row.chest}</td>
                    <td className="px-4 py-2.5 font-light">{row.waist}</td>
                    <td className="px-4 py-2.5 font-light">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuide;