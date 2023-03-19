import React, { useState } from 'react'
import Loader from '../components/loader/Loader'
import TourCard from '../components/tour/TourCard'
import { useFetch } from '../hooks/useFetch'

function Home() {

    const { data: tours, isPending, error } = useFetch('http://localhost:3000/api/v1/tours')
    let tourList
    if (tours) {
        tourList = tours.data.doc.map(tour => (
            <TourCard key={tour._id} tour={tour} />
        ))
    }
    return (
        <>
            {isPending  && <Loader />}
            {error && <Loader />}
            {tours &&
                <main className="main">
                    <div className="card-container">
                        {tourList}
                    </div>
                </main>
            }
        </>
    )
}

export default Home
