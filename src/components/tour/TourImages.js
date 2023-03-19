import React from 'react'
import './tourImages.css'
export default function TourImages({ imgs }) {
    return (
        <section className="section-pictures">
            {imgs.map((img, index) => (
                <div className="picture-box" key={index}>
                    <img className={`picture-box__img picture-box__img--${index + 1}`} src={`http://localhost:3000/img/tours/${img}`} alt="The Park Camper Tour 1" />
                </div>
            ))}
        </section>
    )
}
