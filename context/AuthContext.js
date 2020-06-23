import React, {createContext, useReducer} from 'react'

import authReducer from "../reducers/authReducer";
import { loginUser,logOut } from '../actions/index'
const INITIAL_STATE = {
    isLoggedIn : false
}


export const AuthContext = createContext(INITIAL_STATE)

export const AuthProvider = ({children}) => {
    const [state,dispatch] = useReducer(authReducer,INITIAL_STATE)

    const login = () => {
        console.log('dispatching')
        dispatch(
            loginUser("demo")
        )
    }

    const logout = () => {
        dispatch(
            logOut("demo")
        )
    }

    return(
        <AuthContext.Provider value={{
            isLoggedIn: state.isLoggedIn,
            login,
            logout

        }}>
            {children}
        </AuthContext.Provider>
        )
}
