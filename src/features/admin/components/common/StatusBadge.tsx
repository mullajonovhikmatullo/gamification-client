import {cn} from "@/features/admin/lib/utils.ts";

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default' | 'gold' | 'silver' | 'bronze';

interface StatusBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-accent/10 text-accent border-accent/20',
  error: 'bg-destructive/10 text-destructive border-destructive/20',
  info: 'bg-primary/10 text-primary border-primary/20',
  default: 'bg-muted text-muted-foreground border-border',
  gold: 'bg-amber-100 text-amber-700 border-amber-200',
  silver: 'bg-slate-100 text-slate-600 border-slate-200',
  bronze: 'bg-orange-100 text-orange-700 border-orange-200',
};

export function StatusBadge({ variant = 'default', children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
