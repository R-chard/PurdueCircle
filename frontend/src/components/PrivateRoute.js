import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import redirectIfNotAuth from '../utils/redirectionIfNotAuth'
import Header from './Header'

const PrivateRoute = (props) => {
    const { component: Component, noHeader } = props
    const history = useHistory()

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        redirectIfNotAuth(history)
        .then(function(response){
            if (response.status == 403){
                console.log('not auth')
                history.push("/login")
            } else {
                console.log('good auth')
                setIsAuth(true)
            }
        })
        .catch(function(response){
            console.log('error auth')
            history.push("/login")
        })
    }, [history])

    return (
        <>
            {isAuth && <>
                {!noHeader && <Header />}
                <Component /> 
            </>}
        </>
    )
} //PrivateRoute

export default PrivateRoute
