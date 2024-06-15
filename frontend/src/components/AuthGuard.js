import React from 'react'
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

const AuthGuard = ({guardType, children}) => {
    if (!authService.isLogged()) {
        return <Navigate to="/login"/>
    }
    return children;
};

export default AuthGuard;