'use client'

import { useEffect, useState } from 'react'

export default function BootstrapClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js')
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return null
} 