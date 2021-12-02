import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import AuthContext from '../context/auth/AuthContext';

export const PublicRoutes = ({children}) => {
    const {state:stateAuth} = useContext(AuthContext);
    console.log(stateAuth);
    return stateAuth.uid 
        ? <Redirect to = "/"/>
        : children
}
