"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "./utils";
import { Button } from "./button";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within Carousel");
  }
  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    return () => api.off("select", update);
  }, [api]);

  return (
    <CarouselContext.Provider
      value={{ carouselRef, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();

  return (
    <div
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({ className, ...props }) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cn("absolute left-2 top-1/2 -translate-y-1/2", className)}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}

function CarouselNext({ className, ...props }) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn("absolute right-2 top-1/2 -translate-y-1/2", className)}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};