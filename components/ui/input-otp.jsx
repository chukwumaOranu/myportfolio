"use client"

import * as React from "react"
import { DashIcon } from "@radix-ui/react-icons"
import { OTPInput } from "input-otp"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef(({ className, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("flex items-center gap-2", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef(({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative h-10 w-10 text-center text-sm border rounded-md border-input bg-background text-foreground shadow-sm transition-all",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center w-full h-full">
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center animate-caret-blink">
            <div className="h-4 w-px bg-foreground duration-150" />
          </div>
        )}
      </div>
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = ({ children, ...props }) => {
  if (!children) {
    return <DashIcon className="w-4 h-4" />
  }

  return <div {...props}>{children}</div>
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } 