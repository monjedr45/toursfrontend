import {  useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axios from 'axios'
import { useLocalStorage } from './useLocalStorage'
import { useUser } from "./useUser"

export const useSignup = () => {
    const [token, setToken] = useLocalStorage("token", localStorage.getItem("token"));
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = useAuthContext()
    const { getUser } = useUser()

    const signup = async (name, email, password, passwordConfirm) => {
        setIsPending(true)
        setError(null)
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/users/signup',
                data: {
                    name,
                    email,
                    password,
                    passwordConfirm
                }
            });
            const user = await getUser(res.data.token)

            setToken(res.data.token)
            dispatch({ type: 'LOGIN', payload: user })
            setError(null)
            setIsPending(false)
        } catch (err) {
            setIsPending(false)
            setError(err.response.data.message)
        }
    };

    return { signup, error, isPending, setError }

}
