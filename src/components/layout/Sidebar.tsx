import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplets, 
  BarChart3, 
  CloudRain, 
  FileText,
  X
} from 'lucide-react';
import { LogoAquaIQ } from '@/components/LogoAquaIQ';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/reservatorios', icon: Droplets, label: 'Reservatórios' },
  { to: '/consumo', icon: BarChart3, label: 'Consumo' },
  { to: '/previsoes', icon: CloudRain, label: 'Previsões' },
  { to: '/relatorios-alertas', icon: FileText, label: 'Relatórios' },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b md:justify-center">
          <LogoAquaIQ />
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'hover:bg-muted text-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
