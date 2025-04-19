"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface PriceRangeProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  className?: string;
}

export function PriceRange({
  min,
  max,
  step = 10,
  defaultValue = [min, max],
  onValueChange,
  className,
}: PriceRangeProps) {
  const [value, setValue] = useState<[number, number]>(defaultValue);

  useEffect(() => {
    // Ensure defaultValue is within min/max bounds when props change
    if (defaultValue[0] < min || defaultValue[1] > max) {
      const newValue: [number, number] = [
        Math.max(defaultValue[0], min),
        Math.min(defaultValue[1], max),
      ];
      setValue(newValue);
    } else if (JSON.stringify(defaultValue) !== JSON.stringify(value)) {
      setValue(defaultValue);
    }
  }, [defaultValue, min, max, value]);

  const handleValueChange = (newValue: number[]) => {
    const typedValue = newValue as [number, number];
    setValue(typedValue);
    onValueChange?.(typedValue);
  };

  // Format currency values
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Slider
        defaultValue={value}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        className="my-6"
      />
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-700">
          {formatPrice(value[0])}
        </div>
        <div className="text-sm font-medium text-neutral-700">
          {formatPrice(value[1])}
        </div>
      </div>
    </div>
  );
} 