import React, { useState } from 'react'
import Alert from '../../components/Alert'
import { useSignup } from '../../hooks/useSignup'
import { FaSpinner } from 'react-icons/fa'
import './Login.css'


export default function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const { signup, isPending, error, setError } = useSignup()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (name === '' || email === '' || password === '') {
            return setError('Please enter all your data')
        }
        signup(name, email, password, passwordConfirm)
    }
    return (
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>CREATE YOUR ACCOUNT! </h2>

                <form className='form form--login' onSubmit={handleSubmit}>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='name'> Your name </label>
                        <input
                            value={name}
                            onChange={(e => setName(e.target.value))}
                            id='name'
                            className='form__input'
                            type='test'
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='email'> Email address </label>
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
                        <label className='form__label' htmlFor='password'> password </label>
                        <input
                            value={password}
                            onChange={(e => setPassword(e.target.value))}
                            id='password'
                            className='form__input ma-bt-md'
                            type='password'
                            placeholder='••••••••'
                            minLength='8' />
                    </div>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='passwordConfirm'> Confirm password </label>
                        <input
                            value={passwordConfirm}
                            onChange={(e => setPasswordConfirm(e.target.value))}
                            id='passwordConfirm'
                            className='form__input ma-bt-md'
                            type='password'
                            placeholder='••••••••'
                            minLength='8' />
                        {/* {error && <span className='error'>{error}</span>} */}
                        {error && <Alert type='error' setValue={setError} message={error} />}

                    </div>
                    <div className='form__group'>
                        <button className=' btn btn--blue'>{isPending ? <FaSpinner /> : 'Sign Up'}</button>

                    </div>
                </form>

            </div>

        </main>
    )
}
