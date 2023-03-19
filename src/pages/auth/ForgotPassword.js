import axios from "axios"
import { useEffect, useState } from "react"
import { FaSpinner } from 'react-icons/fa'
import Alert from '../../components/Alert'
import { useFetch } from "../../hooks/useFetch"


export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')

    const { postData, data, error, isPending, setError } = useFetch('http://127.1.0.1:3000/api/v1/users/forgot_password', 'POST')

    const handleSubmit = async (e) => {
        e.preventDefault(true)
        if (email === '') {
            return setError('Please enter a your email address.')
        }
        postData({ email })
    }

    useEffect(() => {
        if (data) {
            setSuccess(data.message)
        }
    }, [data])
    return (
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>Send reset password link to your email</h2>

                <form className='form form--login' onSubmit={handleSubmit}>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='email'>Email address</label>
                        <input
                            value={email}
                            onChange={(e => setEmail(e.target.value))}
                            id='email'
                            className='form__input'
                            type='email'
                            placeholder='you@example.com'
                        />
                    </div>
                    <div className='form__group'>
                        <button className=' btn btn--blue'>{isPending ? <FaSpinner /> : 'Send Email'}</button>

                    </div>
                </form>

                {success && <Alert type='success' setValue={setSuccess} message={success} />}
                {error && <Alert type='error' setValue={setError} message={error} />}
            </div>

        </main>
    )
}