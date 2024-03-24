import {  Navigate } from 'react-router-dom'
export default function PrivateRoute ({children}) {
    let isAuth = localStorage.getItem('token')?true:false;
    return( isAuth?children :<Navigate to="/" />
    
    )
}
