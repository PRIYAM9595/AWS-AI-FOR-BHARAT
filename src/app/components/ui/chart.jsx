"use client";

import React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "./utils";

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within ChartContainer");
  }
  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config = {},
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn("w-full h-full", className)}
        {...props}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

// Tooltip
const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
}) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "rounded-md border bg-white p-2 text-sm shadow",
        className
      )}
    >
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: item.color }}
          />
          <span>{item.name}</span>
          <span className="ml-auto font-medium">
            {item.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// Legend
const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({ payload }) {
  if (!payload?.length) return null;

  return (
    <div className="flex flex-wrap gap-3 text-sm">
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          <div
            className="h-3 w-3 rounded-full"
            style={{ background: item.color }}
          />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};