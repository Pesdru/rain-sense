import { ReservoirStatus, AlertSeverity } from '@/types';

interface StatusBadgeProps {
  status: ReservoirStatus | AlertSeverity;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<string, { label: string; className: string }> = {
  normal: {
    label: 'Normal',
    className: 'bg-success/10 text-success border-success/20',
  },
  atencao: {
    label: 'Atenção',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  critico: {
    label: 'Crítico',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  info: {
    label: 'Info',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

export const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.normal;
  
  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-medium
        ${config.className}
        ${sizeClasses[size]}
      `}
    >
      {config.label}
    </span>
  );
};
