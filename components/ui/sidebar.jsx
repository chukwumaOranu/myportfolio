"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sidebarVariants = cva(
  "group relative flex h-full w-full flex-col gap-4 border-r bg-background p-4 transition-all",
  {
    variants: {
      variant: {
        default: "border-border",
        secondary: "border-secondary bg-secondary/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Sidebar = React.forwardRef(({ className, variant, ...props }, ref) => (
  <aside ref={ref} className={cn(sidebarVariants({ variant }), className)} {...props} />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <header ref={ref} className={cn("flex h-[60px] items-center px-2", className)} {...props} />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarHeaderTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center text-lg font-semibold", className)} {...props} />
))
SidebarHeaderTitle.displayName = "SidebarHeaderTitle"

const SidebarHeaderDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center text-sm text-muted-foreground", className)} {...props} />
))
SidebarHeaderDescription.displayName = "SidebarHeaderDescription"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-1 flex-col gap-2", className)} {...props} />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <footer ref={ref} className={cn("flex items-center gap-2 p-2", className)} {...props} />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-4 p-2", className)} {...props} />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center text-xs font-semibold text-muted-foreground", className)} {...props} />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarNav = React.forwardRef(({ className, ...props }, ref) => (
  <nav ref={ref} className={cn("flex flex-1 flex-col gap-2", className)} {...props} />
))
SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
))
SidebarNavItem.displayName = "SidebarNavItem"

const SidebarNavLink = React.forwardRef(({ className, ...props }, ref) => (
  <a ref={ref} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", className)} {...props} />
))
SidebarNavLink.displayName = "SidebarNavLink"

const SidebarNavButton = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", className)} {...props} />
))
SidebarNavButton.displayName = "SidebarNavButton"

const SidebarNavIcon = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-center", className)} {...props} />
))
SidebarNavIcon.displayName = "SidebarNavIcon"

const SidebarNavText = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
SidebarNavText.displayName = "SidebarNavText"

const SidebarNavSection = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
))
SidebarNavSection.displayName = "SidebarNavSection"

const SidebarNavSectionTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center text-xs font-semibold text-muted-foreground", className)} {...props} />
))
SidebarNavSectionTitle.displayName = "SidebarNavSectionTitle"

const SidebarNavSectionContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
))
SidebarNavSectionContent.displayName = "SidebarNavSectionContent"

const SidebarNavSectionItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
))
SidebarNavSectionItem.displayName = "SidebarNavSectionItem"

const SidebarNavSectionLink = React.forwardRef(({ className, ...props }, ref) => (
  <a ref={ref} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", className)} {...props} />
))
SidebarNavSectionLink.displayName = "SidebarNavSectionLink"

const SidebarNavSectionButton = React.forwardRef(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", className)} {...props} />
))
SidebarNavSectionButton.displayName = "SidebarNavSectionButton"

const SidebarNavSectionIcon = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-center", className)} {...props} />
))
SidebarNavSectionIcon.displayName = "SidebarNavSectionIcon"

const SidebarNavSectionText = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
SidebarNavSectionText.displayName = "SidebarNavSectionText"

export {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarHeaderDescription,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarNav,
  SidebarNavItem,
  SidebarNavLink,
  SidebarNavButton,
  SidebarNavIcon,
  SidebarNavText,
  SidebarNavSection,
  SidebarNavSectionTitle,
  SidebarNavSectionContent,
  SidebarNavSectionItem,
  SidebarNavSectionLink,
  SidebarNavSectionButton,
  SidebarNavSectionIcon,
  SidebarNavSectionText,
} 