import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import Alert from '../../components/Alert'
import { useLogin } from '../../hooks/useLogin'

//! CSS styles
import './Login.css'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error, setError } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      return setError('Please enter your email and password')
    }
    login(email, password)
  }

  return (
    <main className='main'>
      <div className='login-form'>
        <h2 className='heading-secondary ma-bt-lg'>Log into your account </h2>

        <form className='form form--login' onSubmit={handleSubmit}>
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
            {error && <Alert type='error' setValue={setError} message={error} />}
            <NavLink to='/forgot_password' className='forget-password'>Forget your password?</NavLink>
          </div>
          <div className='form__group'>
            <button className=' btn btn--blue'>{isPending ? <FaSpinner /> : 'Login'}</button>

          </div>
        </form>

      </div>

    </main>
  )
}
