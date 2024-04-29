import {  Navigate } from 'react-router-dom'
export default function AdminRoute ({children}) {
  //  let atoken = localStorage.getItem('atoken');
  //  let isAuth = atoken&&atoken !== undefined ?true:false;
  let isAuth= localStorage.getItem('atoken') ?true:false;
    return( isAuth?children :<Navigate to="/alogin" />
    )
}