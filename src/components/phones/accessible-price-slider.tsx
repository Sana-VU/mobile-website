"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";

interface AccessiblePriceSliderProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function AccessiblePriceSlider({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  min = 0,
  max = 500000,
  step = 1000,
}: AccessiblePriceSliderProps) {
  const [sliderValues, setSliderValues] = useState<number[]>([
    Number(minPrice) || min,
    Number(maxPrice) || max,
  ]);

  // Sync slider values with input values
  useEffect(() => {
    const minVal = Number(minPrice) || min;
    const maxVal = Number(maxPrice) || max;
    setSliderValues([minVal, maxVal]);
  }, [minPrice, maxPrice, min, max]);

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
    onMinPriceChange(values[0].toString());
    onMaxPriceChange(values[1].toString());
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onMinPriceChange(value);

    const numValue = Number(value) || min;
    if (numValue <= sliderValues[1]) {
      setSliderValues([numValue, sliderValues[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onMaxPriceChange(value);

    const numValue = Number(value) || max;
    if (numValue >= sliderValues[0]) {
      setSliderValues([sliderValues[0], numValue]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground">
          Price Range (PKR)
        </Label>

        {/* Price Range Slider */}
        <div className="px-2">
          <Slider
            value={sliderValues}
            onValueChange={handleSliderChange}
            max={max}
            min={min}
            step={step}
            aria-label="Price range"
            aria-describedby="price-slider-description"
            className="w-full"
          />
          <div id="price-slider-description" className="sr-only">
            Use arrow keys to adjust price range. Current range:{" "}
            {formatPrice(sliderValues[0])} to {formatPrice(sliderValues[1])}
          </div>
        </div>

        {/* Min/Max Labels */}
        <div className="flex justify-between text-xs text-muted-foreground px-2">
          <span aria-hidden="true">{formatPrice(min)}</span>
          <span aria-hidden="true">{formatPrice(max)}</span>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="min-price-input" className="sr-only">
              Minimum price
            </Label>
            <Input
              id="min-price-input"
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={handleMinInputChange}
              className="h-8 text-sm tabular-nums rounded-2xl"
              min={min}
              max={max}
              step={step}
              aria-describedby="min-price-help"
            />
            <div id="min-price-help" className="sr-only">
              Minimum price in Pakistani Rupees
            </div>
          </div>

          <div>
            <Label htmlFor="max-price-input" className="sr-only">
              Maximum price
            </Label>
            <Input
              id="max-price-input"
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={handleMaxInputChange}
              className="h-8 text-sm tabular-nums rounded-2xl"
              min={min}
              max={max}
              step={step}
              aria-describedby="max-price-help"
            />
            <div id="max-price-help" className="sr-only">
              Maximum price in Pakistani Rupees
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Example: {formatPrice(50000)} - {formatPrice(200000)}
        </div>
      </div>
    </div>
  );
}
