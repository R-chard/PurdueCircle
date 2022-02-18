import React, { useState } from 'react'
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom" 

import Login from './views/Login'
import Home from './views/Home'
import Profile from './views/Profile'
import Logout from './components/Logout'
import SignUp from './views/SignUp'

import {login, signUp} from './utils/login'

import './styles/App.css'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState(null)
    const [showLogout, setShowLogout] = useState(false)
    const history = useHistory()

    const loginSubmit = (e) => {
        e.preventDefault()
        // login("hello")

        const formObject = {
            username,
            email: 'asdf@gmail.com',
            password,
        }

        // change
        console.log("Login object: ", formObject)

        // login(loginObject)
        // // set the response we received from the signUp function in user-controller on the backend
        //     .then(response=>{
        //         setUser(response.signedIn)
        //         history.push('/')
        //     })

        //TODO replace with api call
        login(formObject)
        setUser(formObject)
        history.push('/')

        setUsername('')
        setPassword('')
    }

    const signUpSubmit = (e) => {
        e.preventDefault()
        // login("hello")

        const formObject = {
            username, email, password, name
        }

        // change
        console.log("Sign up object: ", formObject)

        //TODO replace with api call
        signUp(formObject)
        setUser(formObject)
        history.push('/')

        setUsername('')
        setPassword('')
        setName('')
        setEmail('')
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const loginProps = {
        "submit": loginSubmit,
        username,
        password,
        usernameHandler,
        passwordHandler,
    }

    const signUpProps = {
        "submit": signUpSubmit,
        username,
        password,
        name,
        email,
        usernameHandler,
        passwordHandler,
        nameHandler,
        emailHandler
    }

    // const logout = () => { 
    //     setShowLogout(true)
    //  }

    const toggleLogout = () => {
        setShowLogout(showLogout ? false : true)
    }

    return (
        <div className="App">
            <Link to='/' className="headerLink">Home</Link>
            <Link to={'/profile'} className="headerLink">Profile</Link>
            {user ? <button onClick={toggleLogout} className="logOutButton">Settings</button> : ''}
            {showLogout ? <Logout setUser={setUser} setShowLogout={setShowLogout} history={history}/> : ''}

            <Switch>
                <Route exact path='/'>
                    {user ? <Home /> : <Redirect to="/login" />}
                </Route>

                <Route path='/login'>
                    <Login inputFunctions = {loginProps}/>
                </Route>

                <Route path='/profile'>
                    {user ? <Profile /> : <Redirect to="/login" />}
                </Route>

                <Route path='/signup'>
                    <SignUp inputFunctions = {signUpProps}/>
                </Route>
            </Switch>
        </div>
    )
}

export default App
