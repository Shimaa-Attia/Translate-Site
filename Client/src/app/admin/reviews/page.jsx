import AddReview from '@/components/adminReviews/AddReview'
import ReviewsData from '@/components/adminReviews/ReviewsData'
import React from 'react'

export default function Reviews() {
  return (
    <>
    <div className="p-4 m-4 rounded-lg grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 bg-gray-200 ">
      <div>
        <ReviewsData/>
      </div>
      <div>
        <div className="rounded p-2 ">
          <AddReview/>
        </div>
      </div>
    </div>
  </>
  )
}
