import React from 'react'
import { Navigate } from 'react-router-dom';
//import { accountService } from '../../_services/account.service';

const AuthGuard = ({guardType, children}) => {
    // if (!accountService.isLogged() || accountService.getUserRole() !== guardType) {
    //     return <Navigate to="/login"/>
    // }
    // return children;
    return children;
};

export default AuthGuard;