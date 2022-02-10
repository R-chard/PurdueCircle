import React, { useState } from 'react'
import {Redirect, Route, Switch, useHistory} from "react-router-dom" 

import Login from './views/Login'
import Home from './views/Home'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const history = useHistory()
    
    // console.log('render')

    const loginSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')

        const loginObject = {
            username: username,
            password: password,
        }

        console.log(loginObject)
        setUser(loginObject)

        setUsername('')
        setPassword('')
        history.push('/')
    }

    const usernameHandler = (e) => {
        // console.log('username handler')
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        // console.log('password handler')
        setPassword(e.target.value)
    }

    const inputFunctions = {
        "submit": loginSubmit,
        "usernameHandler": usernameHandler,
        "passwordHandler": passwordHandler,
        "username":username,
        "password":password
    }

    return (
        <div className="App">
                <Switch>
                    <Route path='/login'>
                        <Login inputFunctions = {inputFunctions}/>
                    </Route>

                    <Route path='/'>
                        {user ? <Home /> : <Redirect to="/login" />}
                    </Route>
                </Switch>
        </div>
    )
}

export default App
