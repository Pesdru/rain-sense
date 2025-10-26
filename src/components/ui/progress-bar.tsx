interface ProgressBarProps {
  value: number; // 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar = ({ value, showLabel = true, size = 'md' }: ProgressBarProps) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  
  // Color based on value ranges
  const getColor = () => {
    if (clampedValue >= 70) return 'bg-success';
    if (clampedValue >= 40) return 'bg-warning';
    return 'bg-destructive';
  };
  
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-foreground">
            {clampedValue.toFixed(1)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`h-full ${getColor()} transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
