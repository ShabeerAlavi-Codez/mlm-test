import {  Navigate } from 'react-router-dom'
export default function AdminRoute ({children}) {
    let isAuth = localStorage.getItem('atoken')?true:false;
    return( isAuth?children :<Navigate to="/alogin" />
    
    )
}