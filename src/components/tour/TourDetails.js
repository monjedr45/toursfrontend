import { FaClock, FaMapMarkerAlt, FaRegCalendar, FaSortAmountUp, FaStar, FaUserAlt } from "react-icons/fa";
import moment from 'moment/moment'
import Loader from '../loader/Loader';
import TourImages from './TourImages';
import Review from './Review';
import TourGuides from './TourGuides'
import { NavLink, } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import whiteLogo from '../../images/logo-no-background2.png'

import './TourDetails.css'

export default function TourDetails({ tour, isPending }) {
    const { user } = useAuthContext()
    return (
        <div>
            {tour && (
                <>
                    <section className="section-header">
                        <div className="header__hero">
                            <div className="header__hero-overlay">
                                &nbsp;
                            </div>
                            <img className="header__hero-img" src={`http://localhost:3000/img/tours/${tour.data.doc.imageCover}`} alt={tour.data.doc.name} />
                        </div>
                        <div className="heading-box">
                            <h1 className="heading-primary">
                                <span>
                                    {tour.data.doc.name} tour
                                </span>
                            </h1>
                            <div className="heading-box__group">
                                <div className="heading-box__detail">
                                    <FaClock className="heading-box__icon" />
                                    <span className="heading-box__text">{tour.data.doc.duration} days</span>
                                </div>
                                <div className="heading-box__detail">
                                    <FaMapMarkerAlt className="heading-box__icon" />
                                    <span className="heading-box__text">{tour.data.doc.startLocation.description}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-description">
                        <div className="overview-box">
                            <div>
                                <div className="overview-box__group">
                                    <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                                    <div className="overview-box__detail">
                                        <FaRegCalendar className="overview-box__icon" />
                                        <span className="overview-box__label">Tour date</span>
                                        <span className={`${moment().format() > tour.data.doc.startDates[0] ? 'color-red overview-box__text' : 'overview-box__text' }`} >{moment(tour.data.doc.startDates[0]).format('LL')}</span>
                                    </div>
                                    <div className="overview-box__detail">
                                        <FaSortAmountUp className="overview-box__icon" />
                                        <span className="overview-box__label">Difficulty</span>
                                        <span className="overview-box__text">{tour.data.doc.difficulty}</span>
                                    </div>
                                    <div className="overview-box__detail">
                                        <FaUserAlt className="overview-box__icon" />
                                        <span className="overview-box__label">Participants</span>
                                        <span className="overview-box__text">{tour.data.doc.maxGroupSize} people</span>
                                    </div>
                                    <div className="overview-box__detail">
                                        <FaStar className="overview-box__icon" />
                                        <span className="overview-box__label">Rating</span>
                                        <span className="overview-box__text">{tour.data.doc.ratingsAverage} / 5</span>
                                    </div>
                                </div>

                                <TourGuides guides={tour.data.doc.guides} />
                            </div>
                        </div>

                        <div className="description-box">
                            <h2 className="heading-secondary ma-bt-lg">About {tour.data.doc.name} tour</h2>
                            <p className="description__text">
                                {tour.data.doc.description}
                            </p>

                        </div>
                    </section>
                    <TourImages imgs={tour.data.doc.images} />

                    {/* map */}
                    <Review reviews={tour.data.doc.reviews} />

                    <section className="section-cta">
                        <div className="cta">
                            <div className="cta__img cta__img--logo">
                                <img src={whiteLogo} alt="jotours logo" className="" />
                            </div>
                            <img src={`http://localhost:3000/tours/${tour.data.doc.images[1]}`} alt="" className="cta__img cta__img--1" />
                            <img src={`http://localhost:3000/img/tours/${tour.data.doc.images[2]}`} alt="" className="cta__img cta__img--2" />

                            <div className="cta__content">
                                <h2 className="heading-secondary">What are you waiting for?</h2>
                                <p className="cta__text">
                                    {tour.data.doc.duration} days. 1 adventure. Infinite memories. Make it yours today!
                                </p>

                                {moment().format() > tour.data.doc.startDates[0] ?

                                    <button disabled className="btn btn--red span-all-rows">Tour Ended!</button> :

                                    user ? <NavLink to={`/checkout/${tour.data.doc.id}`}
                                        className="btn btn--blue span-all-rows">Book tour now!</NavLink> :
                                        <NavLink state={{ prev: `/checkout/${tour.data.doc.id}` }} to={`/login`} className="btn btn--blue span-all-rows">Book tour now!</NavLink>}

                            </div>
                        </div>
                    </section>
                </>

            )}
            {isPending && <Loader />}

        </div>
    )
}