import React, { useState } from 'react'
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom" 

import Login from './views/Login'
import Home from './views/Home'
import Profile from './views/Profile'

import './styles/App.css'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const history = useHistory()

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
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
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
            <Link to='/' className="link">Home</Link>
            <Link to={'/profile'} className="link">Profile</Link>
            <button onClick={() => setUser(null)} className="logOutButton">log out</button>

            <Switch>
                <Route exact path='/'>
                    {user ? <Home /> : <Redirect to="/login" />}
                </Route>

                <Route path='/login'>
                    <Login inputFunctions = {inputFunctions}/>
                </Route>

                <Route path='/profile'>
                    {user ? <Profile /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </div>
    )
}

export default App
