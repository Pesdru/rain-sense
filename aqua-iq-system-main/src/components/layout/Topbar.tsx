import { LogoAquaIQ } from '@/components/LogoAquaIQ';
import { Menu } from 'lucide-react';

interface TopbarProps {
  title: string;
  onMenuClick?: () => void;
}

export const Topbar = ({ title, onMenuClick }: TopbarProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="hidden md:block">
          <LogoAquaIQ />
        </div>
        
        <div className="flex-1">
          <h1 className="text-lg md:text-xl font-semibold text-foreground">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Placeholder for user menu or actions */}
        </div>
      </div>
    </header>
  );
};
