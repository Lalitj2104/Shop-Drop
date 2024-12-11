import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({children}) => {
    const {isAuthenticated} =useSelector((state)=>state.adminAuth)

    return !isAuthenticated?children:<Navigate to="/admin"/>;
}

export default AuthRoute