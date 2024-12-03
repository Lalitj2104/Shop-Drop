import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
    const {isRetailerAuthenticated} =useSelector(state=>state.userAuth)

    return !isRetailerAuthenticated?children:<Navigate to="/"/>;
}

export default AuthRoute