import {  useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axios from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useLocation, useNavigate } from "react-router-dom"
import { useUser } from "./useUser"





export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    const { state } = useLocation();
    const { getUser } = useUser()
    const [token, setToken] = useLocalStorage("token", localStorage.getItem("token"));



    const login = async (email, password) => {
        setIsPending(true)
        setError(null)
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/users/login',
                data: {
                    email,
                    password
                }
            });
            const user = await getUser(res.data.token)
            setToken(res.data.token)
            dispatch({ type: 'LOGIN', payload: user })
            setError(null)
            setIsPending(false)
            if (state) {
                navigate(state.prev)
            }
        } catch (err) {
            setIsPending(false)
            setError(err.response.data.message)
            setTimeout(() => {
                
                setError('')
            }, 3000)
        }
    };

    return { login, error, isPending, setError }
}