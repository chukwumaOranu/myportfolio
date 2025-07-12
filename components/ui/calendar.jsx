"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

function Calendar({ className, ...props }) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft {...props} className="w-4 h-4" />,
        IconRight: ({ ...props }) => <ChevronRight {...props} className="w-4 h-4" />,
      }}
      {...props}
    />
  )
}

export { Calendar } 