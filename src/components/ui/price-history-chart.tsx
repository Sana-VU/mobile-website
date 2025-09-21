"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format } from "date-fns";

interface PricePoint {
  id: number;
  pricePKR: number;
  source: string;
  date: string;
}

interface PriceStats {
  currentPrice: number | null;
  lowestPrice: number | null;
  highestPrice: number | null;
  averagePrice: number | null;
  totalEntries: number;
}

interface PriceHistoryChartProps {
  data: PricePoint[];
  stats: PriceStats;
  className?: string;
}

/**
 * PriceHistoryChart - Interactive chart showing price trends over time
 * Features:
 * - Line chart with price trends
 * - Hover tooltips with price details
 * - Reference lines for average/min/max prices
 * - Responsive design with mobile support
 */
export function PriceHistoryChart({
  data,
  stats,
  className = "",
}: PriceHistoryChartProps) {
  // Transform data for recharts format
  const chartData = useMemo(() => {
    return [...data]
      .reverse() // Show chronological order (oldest to newest)
      .map((point) => ({
        ...point,
        date: new Date(point.date).getTime(), // Convert to timestamp for proper sorting
        displayDate: format(new Date(point.date), "MMM dd"),
        fullDate: format(new Date(point.date), "PPP"),
        formattedPrice: `PKR ${point.pricePKR.toLocaleString()}`,
      }))
      .sort((a, b) => a.date - b.date); // Ensure chronological order
  }, [data]);

  // Custom tooltip component
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: any }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-soft">
          <p className="font-medium text-card-foreground">
            {data.formattedPrice}
          </p>
          <p className="text-sm text-muted-foreground">{data.fullDate}</p>
          <p className="text-xs text-muted-foreground">Source: {data.source}</p>
        </div>
      );
    }
    return null;
  };

  // Format Y-axis values
  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  if (!data || data.length === 0) {
    return (
      <div
        className={`bg-card rounded-card border border-border p-6 ${className}`}
      >
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            📈
          </div>
          <h3 className="font-medium text-card-foreground mb-2">
            No Price History
          </h3>
          <p className="text-sm">
            Price history data will appear here once available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-card border border-border ${className}`}>
      {/* Chart Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          Price History
        </h3>

        {/* Price Statistics */}
        <div className="flex flex-wrap gap-6 text-sm">
          {stats.currentPrice && (
            <div>
              <span className="text-muted-foreground">Current:</span>
              <span className="ml-1 font-medium text-primary">
                PKR {stats.currentPrice.toLocaleString()}
              </span>
            </div>
          )}

          {stats.lowestPrice && (
            <div>
              <span className="text-muted-foreground">Lowest:</span>
              <span className="ml-1 font-medium text-green-600">
                PKR {stats.lowestPrice.toLocaleString()}
              </span>
            </div>
          )}

          {stats.highestPrice && (
            <div>
              <span className="text-muted-foreground">Highest:</span>
              <span className="ml-1 font-medium text-red-600">
                PKR {stats.highestPrice.toLocaleString()}
              </span>
            </div>
          )}

          {stats.averagePrice && (
            <div>
              <span className="text-muted-foreground">Average:</span>
              <span className="ml-1 font-medium text-card-foreground">
                PKR {stats.averagePrice.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />

              <XAxis
                dataKey="displayDate"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />

              <YAxis
                tickFormatter={formatPrice}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                width={60}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Reference line for average price */}
              {stats.averagePrice && (
                <ReferenceLine
                  y={stats.averagePrice}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="5 5"
                  strokeOpacity={0.5}
                />
              )}

              <Line
                type="monotone"
                dataKey="pricePKR"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--primary))",
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  stroke: "hsl(var(--primary))",
                  strokeWidth: 2,
                  fill: "hsl(var(--background))",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Footer */}
        <div className="mt-4 text-center text-xs text-muted-foreground">
          {stats.totalEntries} price points from various sources
        </div>
      </div>
    </div>
  );
}
