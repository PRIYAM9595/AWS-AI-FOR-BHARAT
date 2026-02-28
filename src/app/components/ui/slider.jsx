"use client";

import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

import { cn } from "./utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <RadixSlider.Root className={cn("", className)} value={_values} min={min} max={max}>
      <RadixSlider.Track>
        <RadixSlider.Range />
      </RadixSlider.Track>
      {Array.from({ length: _values.length }, (_, i) => (
        <RadixSlider.Thumb key={i} />
      ))}
    </RadixSlider.Root>
  );
}

export { Slider };
