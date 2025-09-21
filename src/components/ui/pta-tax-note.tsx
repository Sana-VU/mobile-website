"use client";

import React, { useState } from "react";

interface PTATaxNoteProps {
  phonePrice?: number;
  className?: string;
  variant?: "default" | "compact" | "detailed";
  showCalculator?: boolean;
}

/**
 * PTATaxNote - Pakistan Customs Duty Calculator and Information
 *
 * Features:
 * - Real-time tax calculation based on phone price
 * - PTA approval information and links
 * - Multiple display variants (default, compact, detailed)
 * - Interactive tax calculator
 * - Helpful links and resources
 * - Current tax rates and regulations
 */
export function PTATaxNote({
  phonePrice,
  className = "",
  variant = "default",
  showCalculator = false,
}: PTATaxNoteProps) {
  const [calculatorPrice, setCalculatorPrice] = useState<string>(
    phonePrice?.toString() || ""
  );
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Current PTA tax rates (as of 2024)
  const TAX_RATES = {
    // Import duty + Sales tax + Withholding tax + PTA fee
    smartphone: {
      under25000: 0.165, // 16.5% total
      under50000: 0.185, // 18.5% total
      under75000: 0.205, // 20.5% total
      under100000: 0.225, // 22.5% total
      over100000: 0.245, // 24.5% total
    },
  };

  // Calculate estimated tax
  const calculateTax = (
    price: number
  ): {
    rate: number;
    taxAmount: number;
    totalCost: number;
    bracket: string;
  } => {
    let rate = TAX_RATES.smartphone.over100000;
    let bracket = "Over PKR 100,000";

    if (price <= 25000) {
      rate = TAX_RATES.smartphone.under25000;
      bracket = "Up to PKR 25,000";
    } else if (price <= 50000) {
      rate = TAX_RATES.smartphone.under50000;
      bracket = "PKR 25,001 - 50,000";
    } else if (price <= 75000) {
      rate = TAX_RATES.smartphone.under75000;
      bracket = "PKR 50,001 - 75,000";
    } else if (price <= 100000) {
      rate = TAX_RATES.smartphone.under100000;
      bracket = "PKR 75,001 - 100,000";
    }

    const taxAmount = Math.round(price * rate);
    const totalCost = price + taxAmount;

    return { rate, taxAmount, totalCost, bracket };
  };

  // Get tax info for display
  const price = phonePrice || parseFloat(calculatorPrice) || 0;
  const taxInfo = price > 0 ? calculateTax(price) : null;

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 text-sm ${className}`}>
        <span className="text-amber-600">⚠️</span>
        <span className="text-muted-foreground">
          PTA tax applies
          {taxInfo && (
            <span className="font-medium text-foreground ml-1">
              (~PKR {taxInfo.taxAmount.toLocaleString()})
            </span>
          )}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`bg-amber-50 border border-amber-200 rounded-xl p-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
          📋
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-amber-800 mb-2">
            PTA Tax Information
          </h3>

          {/* Tax Calculation */}
          {taxInfo ? (
            <div className="mb-4">
              <div className="bg-white/60 rounded-lg p-3 mb-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground block">
                      Device Price
                    </span>
                    <span className="font-semibold text-foreground">
                      PKR {price.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">
                      Tax Bracket
                    </span>
                    <span className="font-medium text-amber-700">
                      {taxInfo.bracket}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">
                      Estimated Tax
                    </span>
                    <span className="font-semibold text-amber-600">
                      PKR {taxInfo.taxAmount.toLocaleString()}
                      <span className="text-xs ml-1">
                        ({(taxInfo.rate * 100).toFixed(1)}%)
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">
                      Total Cost
                    </span>
                    <span className="font-bold text-foreground">
                      PKR {taxInfo.totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-amber-700 mb-4 text-sm">
              Pakistan Telecommunications Authority (PTA) tax applies to all
              smartphones. Enter device price for exact calculation.
            </p>
          )}

          {/* Calculator Toggle */}
          {(showCalculator || !phonePrice) && (
            <div className="mb-4">
              {!isCalculatorOpen ? (
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium underline"
                >
                  Calculate tax for different price
                </button>
              ) : (
                <div className="bg-white/60 rounded-lg p-3">
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Enter device price (PKR):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={calculatorPrice}
                      onChange={(e) => setCalculatorPrice(e.target.value)}
                      placeholder="e.g., 85000"
                      className="flex-1 px-3 py-2 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                    <button
                      onClick={() => setIsCalculatorOpen(false)}
                      className="px-3 py-2 text-sm text-amber-600 hover:text-amber-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Important Info */}
          <div className="text-sm text-amber-700 space-y-2">
            <p>
              <strong>Important:</strong> These are estimated rates. Actual tax
              may vary based on device specifications and import regulations.
            </p>

            {variant === "detailed" && (
              <>
                <p>
                  <strong>Tax Components:</strong> Import duty, Sales tax,
                  Withholding tax, and PTA registration fee.
                </p>
                <p>
                  <strong>PTA Approval:</strong> Devices must be PTA-approved
                  for legal use in Pakistan.
                </p>
              </>
            )}
          </div>

          {/* Links */}
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://dirbs.pta.gov.pk/mobile-device-registration"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              PTA Device Registration
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <a
              href="https://www.fbr.gov.pk/CustomsGuidance/Tariff"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              FBR Tariff Guide
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
