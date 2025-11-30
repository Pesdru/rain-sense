import { Droplet } from 'lucide-react';

export const LogoAquaIQ = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Droplet className="h-8 w-8 text-primary fill-primary" />
      </div>
      <span className="text-xl font-bold text-foreground">Aqua IQ</span>
    </div>
  );
};
