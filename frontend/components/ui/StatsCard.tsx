// Stats Card Component

import { Card, CardBody } from "./Card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600",
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  vs last period
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
              {icon}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
