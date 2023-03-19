import React, { useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

import TourDetails from '../components/tour/TourDetails'



export default function Tour() {
  const { id } = useParams()
  const { data: tour, isPending, error } = useFetch(`http://localhost:3000/api/v1/tours/${id}`)
  
  return (

    <TourDetails tour={tour} isPending={isPending} error={error} />
  )
}
