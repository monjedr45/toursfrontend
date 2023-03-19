import { useEffect, useState } from "react"
import { FaCreditCard, FaSpinner } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import Alert from "../Alert"
import { useFetch } from "../../hooks/useFetch"



export default function PayForm({ tour, id }) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [cardNumber, setCardNumber] = useState(0)
    const [CVC, setCVC] = useState(0)
    const [cardDate, setCardDate] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const navigate = useNavigate();
    const { user } = useAuthContext()

    const { postData, data, error, isPending, setError } = useFetch('http://localhost:3000/api/v1/bookings/checkout', 'POST')
    const handelSubmit = async (e) => {
        e.preventDefault()
        postData({ tour: id, price: tour.data.doc.price })
    }
    useEffect(() => {
        if (data) {
            navigate("/")
        }
    }, [data])

    return (
        <div className='pay-container'>
            <h2>Pay with card</h2>
            <form className='form form--login' onSubmit={handelSubmit} >
                <div className='form__group'>
                    <label className='form__label' htmlFor='email'> Email address </label>
                    <input

                        value={user.email}
                        onChange={(e => setEmail(e.target.value))}
                        id='email'
                        className='form__input'
                        type='email'
                        placeholder='you@example.com'
                    />
                </div>
                <div className='form__group'>
                    <label className='form__label' htmlFor='email'>Card information <FaCreditCard /></label>

                    <input
                        value={cardNumber || ''}
                        onChange={(e => setCardNumber(e.target.value))}
                        id='cardNumber'
                        className='form__input'
                        type='number'
                        placeholder='1234 1234 1234 1234'
                    />
                    <div>
                        <input
                            value={cardDate}
                            onChange={(e => setCardDate(e.target.value))}
                            id='cardDate'
                            className='form__input'
                            type='number'
                            placeholder='MM/YY'
                        />
                        <input
                            value={CVC || ''}
                            onChange={(e => setCVC(e.target.value))}
                            id='email'
                            className='form__input'
                            type='number'
                            placeholder='CVC'
                        />
                    </div>
                </div>
                <div className='form__group'>
                    <label className='form__label' htmlFor='nameOnCard' >Name on card</label>

                    <input
                        value={name}
                        onChange={(e => setName(e.target.value))}
                        id='nameOnCard'
                        className='form__input'
                        type='number'
                        placeholder='1234 1234 1234 1234'
                    />

                </div>
                <div className='form__group'>
                    <button className=' btn btn--blue' style={{ width: "100%" }}> {isPending ? <FaSpinner /> : `Pay $${tour.data.doc.price}`}</button>

                </div>
            </form>
            {isChecked && <Alert type='success' setValue={setIsChecked} message='Booked done successfully' />}
            {error && <Alert type='error' setValue={setError} message={error} />}
        </div>
    )
}