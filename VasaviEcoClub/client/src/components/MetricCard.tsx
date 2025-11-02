import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  id: string;
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

export function MetricCard({ id, title, value, icon: Icon, description }: MetricCardProps) {
  return (
    <Card className="hover-elevate transition-all" data-testid={`card-metric-${id}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-muted-foreground" data-testid={`text-metric-title-${id}`}>
              {title}
            </p>
            <p className="text-3xl font-bold font-mono" data-testid={`text-metric-value-${id}`}>
              {value}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground" data-testid={`text-metric-description-${id}`}>
                {description}
              </p>
            )}
          </div>
          <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
