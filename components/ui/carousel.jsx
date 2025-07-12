"use client"

import * as React from "react"
import * as CarouselPrimitive from "@radix-ui/react-carousel"
import { cn } from "@/lib/utils"

const Carousel = CarouselPrimitive.Root
const CarouselViewport = React.forwardRef(({ className, ...props }, ref) => (
  <CarouselPrimitive.Viewport ref={ref} className={cn("overflow-hidden", className)} {...props} />
))
CarouselViewport.displayName = CarouselPrimitive.Viewport.displayName

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <CarouselPrimitive.Item ref={ref} className={cn("min-w-0", className)} {...props} />
))
CarouselItem.displayName = CarouselPrimitive.Item.displayName

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => (
  <CarouselPrimitive.Previous ref={ref} className={cn("absolute left-2 top-1/2 -translate-y-1/2 z-10", className)} {...props} />
))
CarouselPrevious.displayName = CarouselPrimitive.Previous.displayName

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => (
  <CarouselPrimitive.Next ref={ref} className={cn("absolute right-2 top-1/2 -translate-y-1/2 z-10", className)} {...props} />
))
CarouselNext.displayName = CarouselPrimitive.Next.displayName

export { Carousel, CarouselViewport, CarouselItem, CarouselPrevious, CarouselNext } 