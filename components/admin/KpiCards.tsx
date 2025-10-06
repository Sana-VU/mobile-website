import { Card } from "@/components/ui/card";

interface KPI {
  title: string;
  value: number | string;
  change?: string;
}

interface KpiCardsProps {
  metrics: KPI[];
}

export function KpiCards({ metrics }: KpiCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="space-y-2">
          <p className="text-sm text-slate-500">{metric.title}</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">{metric.value}</p>
          {metric.change && <p className="text-xs text-emerald-500">{metric.change}</p>}
        </Card>
      ))}
    </div>
  );
}
