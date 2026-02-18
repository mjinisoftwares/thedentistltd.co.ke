'use client'

import dynamic from 'next/dynamic'

const ReviewsWidget = dynamic(() => import('./GoogleReviews'), {
  ssr: false,
})

export default ReviewsWidget
