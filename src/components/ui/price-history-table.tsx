"use client";

import React, { useMemo, useState } from "react";
import { format } from "date-fns";

interface PricePoint {
  id: number;
  pricePKR: number;
  source: string;
  date: string;
}

interface PriceHistoryTableProps {
  data: PricePoint[];
  className?: string;
}

/**
 * PriceHistoryTable - Displays price history in a sortable table format
 * Features:
 * - Sortable by date, price, and source
 * - Responsive design with mobile-friendly layout
 * - Color-coded price changes
 * - Source badges for different vendors
 */
export function PriceHistoryTable({
  data,
  className = "",
}: PriceHistoryTableProps) {
  const [sortBy, setSortBy] = useState<"date" | "price" | "source">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Sort data based on current sort settings
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "price":
          comparison = a.pricePKR - b.pricePKR;
          break;
        case "source":
          comparison = a.source.localeCompare(b.source);
          break;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });
  }, [data, sortBy, sortOrder]);

  // Handle column header clicks for sorting
  const handleSort = (column: "date" | "price" | "source") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  // Get price change indicator compared to previous entry
  const getPriceChange = (currentPrice: number, index: number) => {
    if (index === sortedData.length - 1) return null; // No previous price for comparison

    const previousPrice = sortedData[index + 1]?.pricePKR;
    if (!previousPrice) return null;

    const change = currentPrice - previousPrice;
    const percentChange = ((change / previousPrice) * 100).toFixed(1);

    return {
      change,
      percentChange: parseFloat(percentChange),
      isIncrease: change > 0,
      isDecrease: change < 0,
    };
  };

  // Get source badge color
  const getSourceBadgeColor = (source: string) => {
    const sourceColors: Record<string, string> = {
      Daraz: "bg-orange-100 text-orange-800 border-orange-200",
      PriceOye: "bg-blue-100 text-blue-800 border-blue-200",
      Homeshopping: "bg-green-100 text-green-800 border-green-200",
      OLX: "bg-purple-100 text-purple-800 border-purple-200",
      WhatMobile: "bg-primary/10 text-primary border-primary/20",
    };

    return sourceColors[source] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  // Sort indicator component
  const SortIndicator = ({
    column,
  }: {
    column: "date" | "price" | "source";
  }) => {
    if (sortBy !== column) {
      return <span className="text-muted-foreground ml-1">↕</span>;
    }

    return (
      <span className="text-primary ml-1">
        {sortOrder === "desc" ? "↓" : "↑"}
      </span>
    );
  };

  if (!data || data.length === 0) {
    return (
      <div
        className={`bg-card rounded-card border border-border p-6 ${className}`}
      >
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            📊
          </div>
          <h3 className="font-medium text-card-foreground mb-2">
            No Price Data
          </h3>
          <p className="text-sm">
            Price history table will appear here once data is available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-card border border-border ${className}`}>
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          Price History Table
        </h3>
        <p className="text-sm text-muted-foreground">
          {data.length} price entries from various sources
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th
                className="text-left p-4 font-medium text-card-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("date")}
              >
                Date
                <SortIndicator column="date" />
              </th>
              <th
                className="text-left p-4 font-medium text-card-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("price")}
              >
                Price
                <SortIndicator column="price" />
              </th>
              <th
                className="text-left p-4 font-medium text-card-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort("source")}
              >
                Source
                <SortIndicator column="source" />
              </th>
              <th className="text-left p-4 font-medium text-card-foreground">
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const priceChange = getPriceChange(item.pricePKR, index);

              return (
                <tr
                  key={item.id}
                  className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
                >
                  {/* Date */}
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-card-foreground">
                        {format(new Date(item.date), "MMM dd, yyyy")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(item.date), "h:mm a")}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <div className="font-semibold text-card-foreground">
                      PKR {item.pricePKR.toLocaleString()}
                    </div>
                  </td>

                  {/* Source */}
                  <td className="p-4">
                    <span
                      className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border
                      ${getSourceBadgeColor(item.source)}
                    `}
                    >
                      {item.source}
                    </span>
                  </td>

                  {/* Price Change */}
                  <td className="p-4">
                    {priceChange ? (
                      <div
                        className={`
                        flex items-center text-sm font-medium
                        ${priceChange.isIncrease ? "text-red-600" : ""}
                        ${priceChange.isDecrease ? "text-green-600" : ""}
                      `}
                      >
                        <span className="mr-1">
                          {priceChange.isIncrease ? "↗" : "↘"}
                        </span>
                        <span>
                          {priceChange.isIncrease ? "+" : ""}
                          {priceChange.percentChange}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Sorted by {sortBy} (
            {sortOrder === "desc" ? "newest first" : "oldest first"})
          </span>
          <span>Last updated: {format(new Date(data[0]?.date), "PPp")}</span>
        </div>
      </div>
    </div>
  );
}
