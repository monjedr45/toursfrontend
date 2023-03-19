import { createContext, useEffect, useReducer } from 'react'
import { useUser } from '../hooks/useUser'


export const AuthContext = createContext()

export const authReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'UPDATE_USER':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const { getUser } = useUser()

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(() => {
        const unSub = async () => {
            try {
                const user = await getUser(JSON.parse(localStorage.getItem("token")))
                dispatch({ type: 'AUTH_IS_READY', payload: user })
            } catch (err) {
                // console.log(err);
                dispatch({ type: 'AUTH_IS_READY', payload: null })
            }
        }
        unSub()
    }, [])
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}