import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentTimerProps {
  onComplete: () => void;
  onCancel: () => void;
  amount: number;
  upiId: string;
}

const PaymentTimer = ({ onComplete, onCancel, amount, upiId }: PaymentTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      onCancel();
    }
  }, [timeLeft, isCompleted, onCancel]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePaymentComplete = () => {
    setIsCompleted(true);
    setTimeout(() => { onComplete(); }, 1000);
  };

  if (isCompleted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="text-emerald-500 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" size={64} />
        <h2 className="text-2xl font-bold text-emerald-400 mb-2">Payment Successful!</h2>
        <p className="text-gray-400 text-sm">Redirecting to your orders panel...</p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6 text-white p-2">
      <div className="bg-purple-600/10 border border-purple-500/20 rounded-2xl p-4 inline-block animate-pulse">
        <Smartphone className="text-purple-400" size={40} />
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-1">Complete Payment on Phone</h2>
        <p className="text-sm text-gray-400">
          Open your UPI app and complete the transaction safe & secure.
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.06] p-6 rounded-2xl shadow-inner">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Clock className="text-purple-400 animate-spin-slow" size={18} />
          <span className="text-2xl font-mono font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {formatTime(timeLeft)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-4">Time remaining to secure token authorization</p>
        
        <div className="bg-black/40 p-4 rounded-xl border border-white/[0.05] flex flex-col items-center">
          <p className="text-[11px] font-medium text-gray-400 mb-1">Total Amount Due:</p>
          <p className="text-2xl font-black text-white mb-2">£{amount.toFixed(2)}</p>
          <div className="w-full h-[1px] bg-white/[0.05] my-2" />
          <code className="text-xs bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/5 text-purple-300 font-mono select-all cursor-pointer">{upiId}</code>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Button onClick={handlePaymentComplete} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium rounded-xl transition-all">
          I've Completed the Payment
        </Button>
        <Button onClick={onCancel} variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
          Cancel Transaction
        </Button>
      </div>
    </div>
  );
};

export default PaymentTimer;