import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

//! CSS styles
import './review.css'

export default function Review({ reviews }) {
    const stars = [1, 2, 3, 4, 5]
    return (
        <section className="section-reviews" >
            <div className="reviews">
                {reviews.map((review) => (
                    <div className="reviews__card" key={review._id}>
                        <div className="reviews__avatar">
                            <img src={`http://localhost:3000/img/users/${review.user.photo}`} alt="Jim Brown" className="reviews__avatar-img" />
                            <h6 className="reviews__user">{review.user.name}</h6>
                        </div>
                        <p className="reviews__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                            dignissimos sint quo commodi corrupti accusantium veniam saepe
                            numquam.
                        </p>

                        <div className="reviews__rating">
                            {stars.map((star,index) => {
                                if (review.ratings >= star) {
                                    return <svg key={index} className="reviews__star reviews__star--active">
                                        <FaStar />
                                    </svg>
                                } else {
                                    return <svg key={index} className="reviews__star reviews__star--active">
                                        <FaRegStar />
                                    </svg>
                                }
                            }
                            )}
                        </div>
                    </div>

                ))}
            </div>

        </section>
    )
}
