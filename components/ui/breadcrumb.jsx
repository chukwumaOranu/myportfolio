import * as React from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

function Breadcrumb({ children, className, ...props }) {
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb" {...props}>
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {children}
      </ol>
    </nav>
  )
}

function BreadcrumbItem({ children, className, ...props }) {
  return (
    <li className={cn("inline-flex items-center", className)} {...props}>
      {children}
    </li>
  )
}

function BreadcrumbLink({ href, children, className, ...props }) {
  return (
    <Link href={href} className={cn("text-sm font-medium text-gray-700 hover:text-gray-900", className)} {...props}>
      {children}
    </Link>
  )
}

function BreadcrumbSeparator({ className, ...props }) {
  return (
    <span className={cn("mx-2 text-gray-400", className)} {...props}>
      <ChevronRight className="w-4 h-4" />
    </span>
  )
}

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } 