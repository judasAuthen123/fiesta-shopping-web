import React from 'react'
import Star from '../../../public/components/rating/star/Star'

export default function ItemAppReview({name, avatar, rating, message}) {
  return (
    <div>
      <div>
        <Star count={rating}/>
      </div>
      <p>
        {message}
      </p>
      
    </div>
  )
}
export const appReviews = [
    {
        id: "1",
        name: "Leslie Alexander",
        avatar: "",
        comment: {
            rating: 5,
            message: "it's look like so good"
        }
    },
    {
        id: "2",
        name: "Leslie Alexander",
        avatar: "",
        comment: {
            rating: 5,
            message: "it's look like so good"
        }
    },
    {
        id: "3",
        name: "Leslie Alexander",
        avatar: "",
        comment: {
            rating: 5,
            message: "it's look like so good"
        }
    },
    {
        id: "4",
        name: "Leslie Alexander",
        avatar: "",
        comment: {
            rating: 5,
            message: "it's look like so good"
        }
    },
    {
        id: "5",
        name: "Leslie Alexander",
        avatar: "",
        comment: {
            rating: 5,
            message: "it's look like so good"
        }
    }
]
