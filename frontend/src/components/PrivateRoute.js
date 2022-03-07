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



    const [userScheme, setUserScheme] = useState('colorAuto')

    useEffect(() => {
        function listener(event) {
            let isAuto = document.body.classList[0]
            console.log("auto", isAuto);
            if (isAuto === 'colorAuto') {
                let colorScheme = document.body.classList[1]
                const newColorScheme = event.matches ? "colorDark" : "colorLight";
                document.body.classList.remove(colorScheme)
                document.body.classList.add(newColorScheme)
            }
        }

        let colorScheme = document.body.classList[0]

        if (colorScheme) {
            if (userScheme === 'colorAuto') {
                document.body.classList.remove(document.body.classList[1])
                document.body.classList.remove(document.body.classList[0])
                colorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "colorDark" : 'colorLight'
                console.log("auto");

                document.body.classList.add('colorAuto')
            } else {
                console.log("manual");
                colorScheme = userScheme
                document.body.classList.remove(document.body.classList[1])
                document.body.classList.remove(document.body.classList[0])
            }
            console.log("colorscheme", colorScheme)
            document.body.classList.add(colorScheme)
        } else {
            colorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "colorDark" : 'colorLight'
            document.body.classList.add('colorAuto')
            document.body.classList.add(colorScheme)
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
            console.log("initial");
        }
        console.log("effect");
    }, [userScheme])


    return (
        <div>
            {isAuth && <div>
                {!noHeader && <Header userScheme={userScheme} setUserScheme={setUserScheme}/>}
                <Component /> 
            </div>}
        </div>
    )
} //PrivateRoute

export default PrivateRoute
