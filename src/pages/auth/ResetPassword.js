import { useEffect, useState } from "react"
import { FaSpinner } from 'react-icons/fa'
import Alert from '../../components/Alert'
import { useNavigate, useParams } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useUser } from "../../hooks/useUser"
import { useFetch } from "../../hooks/useFetch"




export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [success, setSuccess] = useState('')
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    const { getUser } = useUser()
    const { token } = useParams()

    const { updateData, data, error, isPending, setError } = useFetch(`http://127.1.0.1:3000/api/v1/users/reset_password/${token}`, 'PATCH')

    const handleSubmit = async (e) => {
        e.preventDefault(true)
        if (password !== passwordConfirm) {
            setError('passwords do not match')
        } else {
            updateData({ password, passwordConfirm })
        }
    }

    useEffect(() => {
        if (data) {
            const fun = async () => {
                const user = await getUser(data.token)
                dispatch({ type: 'LOGIN', payload: user })
                setSuccess(data.message)
                navigate('/')
            }
            fun()
        }
    }, [data])
    return (
        <main className='main'>
            <div className='login-form'>
                <h2 className='heading-secondary ma-bt-lg'>Enter your new password</h2>

                <form className='form form--login' onSubmit={handleSubmit}>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='Password'>Password</label>
                        <input
                            value={passwordConfirm}
                            onChange={(e => setPasswordConfirm(e.target.value))}
                            id='Password'
                            className='form__input'
                            type='Password'
                            placeholder='••••••••'
                        />
                    </div>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='ConfirmPassword'>Confirm Password</label>
                        <input
                            value={password}
                            onChange={(e => setPassword(e.target.value))}
                            id='ConfirmPassword'
                            className='form__input'
                            type='Password'
                            placeholder='••••••••'
                        />
                    </div>
                    <div className='form__group'>
                        <button className=' btn btn--blue'>{isPending ? <FaSpinner /> : 'Submit'}</button>

                    </div>
                </form>

                {success && <Alert type='success' setValue={setSuccess} message={success} />}
                {error && <Alert type='error' setValue={setError} message={error} />}
            </div>

        </main>
    )
}