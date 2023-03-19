import { useState } from "react"
import { useParams } from "react-router-dom"
import PayForm from "../components/checkout/PayForm"
import TourInfo from "../components/checkout/TourInfo"
import { useFetch } from "../hooks/useFetch"

//! CSS Styles 
import '../components/checkout/checkout.css'

export default function Checkout() {
  const { id } = useParams()
  const [url] = useState(`http://127.1.0.1:3000/api/v1/tours/${id}`)
  const { data: tour } = useFetch(url)


  return (
    <>
      {tour && <main className='checkout-container'>
        <div className='checkout-view'>
          <TourInfo tour={tour} />
          <PayForm tour={tour} id={id} />

        </div>
      </main>}
    </>

  )
}