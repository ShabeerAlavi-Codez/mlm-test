import { Route, Navigate } from 'react-router-dom'
export default function PrivateRoute ({children, ...rest}) {
    let auth = localStorage.getItem('token')
    return(
        <Route {...rest}>
                {!auth.token 
                    ?
                    <Navigate to='/'/>
                    : 
                    children}
        </Route>
    )
}
