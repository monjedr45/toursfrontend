import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaMapMarkerAlt, FaCalendarAlt, FaFlag, FaUserAlt } from "react-icons/fa";
import moment from 'moment/moment'
import './tourCard.css'
export default function TourCard({ tour }) {
    return (
        <div className="card" role='tourCard' key={tour._id}>
            <div className="card__header">
                <div className="card__picture">
                    <div className="card__picture-overlay">&nbsp;</div>
                    <img
                        src={`http://localhost:3000/img/tours/${tour.imageCover}`}
                        alt={`${tour.name}`}
                        className="card__picture-img"
                    />
                </div>

                <h3 className="heading-tertirary">
                    <span>{tour.name}</span>
                </h3>
            </div>

            <div className="card__details">
                <h4 className="card__sub-heading">{tour.difficulty} {tour.duration}-day tour </h4>
                <p className="card__text">
                    {tour.summary}
                </p>
                <div className="card__data">
                    <FaMapMarkerAlt className="card__icon" />
                    <span>{tour.startLocation.description}</span>
                </div>
                <div className="card__data">
                    <FaCalendarAlt className="card__icon" />

                    {/* {moment().format() > tour.startDates[0] ? 'yse' : 'no'} */}
                    <span className={`${moment().format() > tour.startDates[0] ? 'color-red' : ''}`} >{moment(tour.startDates[0]).format('LL')} </span>
                </div>
                <div className="card__data">
                    <FaFlag className="card__icon" />
                    <span>{tour.locations.length} stops</span>
                </div>
                <div className="card__data">
                    <FaUserAlt className="card__icon" />
                    <span>{tour.maxGroupSize} people</span>
                </div>
            </div>

            <div className="card__footer">
                <p>
                    <span className="card__footer-value">${tour.price} </span>
                    <span className="card__footer-text">per person</span>
                </p>
                <p className="card__ratings">
                    <span className="card__footer-value">{tour.ratingsAverage} </span>
                    <span className="card__footer-text">rating ({tour.ratingsQuantity})</span>
                </p>
                <NavLink to={`/tour/${tour._id}`} role='DetailsButton' className="btn btn--blue btn--small">Details</NavLink>
            </div>
        </div>
    )
}
