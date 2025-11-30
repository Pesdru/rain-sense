import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const KpiCard = ({ icon: Icon, label, value, subtitle, trend }: KpiCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </div>
          <div className="text-3xl md:text-4xl font-semibold text-foreground mb-1">
            {value}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg ${
              trend.isPositive
                ? 'text-success bg-success/10'
                : 'text-destructive bg-destructive/10'
            }`}
          >
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </Card>
  );
};
