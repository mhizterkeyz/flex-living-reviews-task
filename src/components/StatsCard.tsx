interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  icon,
}: StatsCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)] transition-all duration-200 hover:shadow-[0_4px_16px_0_rgb(0_0_0_/0.12)]">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {title}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
            {value}
          </p>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="mt-3 flex items-center gap-1.5">
              <span
                className={`text-sm font-semibold ${
                  trend.isPositive
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">
                vs last period
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
