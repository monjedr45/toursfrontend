import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axios from 'axios'
import { useLocalStorage } from "./useLocalStorage"


export const useLogout = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()
    const [token, setToken] = useLocalStorage("token", localStorage.getItem("token"));

    const logout = async (token) => {
        setError(null)
        //! sign user out
        try {
            await axios({
                method: 'get',
                url: 'http://localhost:3000/api/v1/users/logout',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })

            dispatch({ type: 'LOGOUT' })
            setToken(null)

            setError(null)

        } catch (error) {
            setError(error.message)

        }
    }
    return { logout, error }
}