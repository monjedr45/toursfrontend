import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFetch } from "../../hooks/useFetch"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import Alert from "../Alert"
import { FaSpinner } from 'react-icons/fa'

export default function PasswordChangeForm() {
    const { user, dispatch } = useAuthContext()
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)
    const [token, setToken] = useLocalStorage("token", localStorage.getItem("token"));
    const { updateData, data, error, isPending, setError } = useFetch('http://localhost:3000/api/v1/users/update_password', 'PATCH')


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== passwordConfirm) {
            return setError('password dose not match password confirmation')
        }
        if (password === '' || passwordConfirm === '') {
            return setError('Please fill the field first!')
        }
        updateData({ currentPassword, password, passwordConfirm }, 'json')
    }

    useEffect(() => {
        if (data) {
            setToken(data.token)
            setIsUpdated(true)
            dispatch({ type: 'UPDATE_USER', payload: user })
        }
    }, [data])

    return (
        <div className='user-view__form-container'>
            <h2 className='heading-secondary ma-bt-md'>Password change</h2>
            <form className='form.form-user-data' onSubmit={handleSubmit}>
                <div className='form__group'>
                    <label className='form__label' htmlFor='password-current'>Current password</label>
                    <input
                        id='password-current'
                        className='form__input'
                        type='password' placeholder='••••••••'
                        minLength='8'
                        defaultValue={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className='form__group'>
                    <label className='form__label' htmlFor='password'>New password</label>
                    <input id='password' className='form__input' type='password' placeholder='••••••••'
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className='form__group'>
                    <label className='form__label' htmlFor='password-confirm'>Confirm password</label>
                    <input id='password-confirm' className='form__input' type='password' placeholder='••••••••'
                        defaultValue={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>

                <div className='form__group right'>
                    <button className='btn btn--small btn--blue'>{isPending ? <FaSpinner /> : 'Save settings'}</button>
                </div>
            </form>
            {isUpdated && <Alert type='success' setValue={setIsUpdated} message='Data updated successfully' />}
            {error && <Alert type='error' message={error} setValue={setError} />}

        </div>
    )
}