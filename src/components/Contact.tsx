import { useState } from 'react';
import { X, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

const Contact = ({ isOpen, onClose }: ContactProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Missing Information", description: "Please fill in required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#0f111a]/95 backdrop-blur-2xl border border-white/[0.08] text-white rounded-3xl shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-white/[0.05] pb-4">
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Contact Us</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0">
            <X size={18} />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2 text-xs text-gray-300 bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
              <Mail className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="truncate">support@loomandco.com</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-300 bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+44 20 1234 5678</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-300 bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
              <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
              <span className="truncate">London, W1C 1DE</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Name *</label>
                <Input value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Your name" className="bg-white/[0.02] border-white/10 text-white rounded-xl focus:border-purple-500" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Email *</label>
                <Input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="your@email.com" className="bg-white/[0.02] border-white/10 text-white rounded-xl focus:border-purple-500" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject</label>
              <Input value={formData.subject} onChange={(e) => handleInputChange('subject', e.target.value)} placeholder="How can we help?" className="bg-white/[0.02] border-white/10 text-white rounded-xl focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Message *</label>
              <Textarea value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} placeholder="Tell us what you need help with..." rows={4} className="bg-white/[0.02] border-white/10 text-white rounded-xl focus:border-purple-500 resize-none" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-medium transition-all duration-300" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Contact;