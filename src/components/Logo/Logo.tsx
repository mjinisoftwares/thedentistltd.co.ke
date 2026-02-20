import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <Image
      alt="Payload Logo"
      width={190}
      height={32}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9rem] w-full h-auto', className)}
      src="/logo.webp"
    />
  )
}
