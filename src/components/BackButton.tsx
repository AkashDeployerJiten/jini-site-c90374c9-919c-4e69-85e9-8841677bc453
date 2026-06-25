import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  className?: string;
  to?: string;
}

const BackButton = ({ className = "", to }: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  if (location.pathname === '/') return null;

  const handleBack = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`flex items-center space-x-2 text-gray-400 hover:text-white bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] backdrop-blur-md rounded-xl transition-all duration-200 ${className}`}
    >
      <ArrowLeft size={16} className="text-purple-400" />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;