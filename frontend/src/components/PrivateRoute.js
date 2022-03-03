import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import redirectIfNotAuth from '../utils/redirectionIfNotAuth'
import Header from './Header'

const PrivateRoute = (props) => {
    const { component: Component, noHeader } = props
    const history = useHistory()

    const [isAuth, setIsAuth] = useState(false)
    // console.log('%crender privateroute', 'color: green; font-size: 15px');

    useEffect(() => {
        // console.log('%c\nprivateroute effect\n', 'color:blue; font-weight: bold; font-size: 15px');

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

        return () => {
        //   console.log('\n%cprivateroute cleanup\n\n', 'color:orange; font-weight: bold; font-size: 15px');
        }
      }, [history])

    return (
        <div>
            {isAuth && <div>
                {!noHeader && <Header />}
                <Component /> 
            </div>}
        </div>
    )
} //PrivateRoute

export default PrivateRoute
