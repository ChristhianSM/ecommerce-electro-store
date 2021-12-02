import React, { useContext } from 'react'
import {Redirect} from 'react-router-dom'
import AuthContext from '../context/auth/AuthContext'

export const PrivateRoute = ({children}) => {
    const {state:stateAuth} = useContext(AuthContext);
    console.log(stateAuth);
    return stateAuth.uid 
        ? children
        : <Redirect to = "/"/>
}
