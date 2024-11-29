import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = ({children}) => {
    const token = localStorage.getItem('token');
    if(!token){
        alert('Please login to access the admin dashboard.') 
        return <Navigate to='/admin' />
    }
    return children ? children : <Outlet />;
}

export default AdminPrivateRoute