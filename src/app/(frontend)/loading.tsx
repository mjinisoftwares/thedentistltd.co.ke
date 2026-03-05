import React from 'react'
import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center text-primary">
      <Spinner />
    </div>
  )
}
