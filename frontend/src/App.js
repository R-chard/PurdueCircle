import React, { useState } from 'react'
import {Redirect, Route, Switch, useHistory} from "react-router-dom" 

import './styles/App.css'

import {login, signUp} from './utils/login'

import Button from './components/Button'
import Logout from './components/Popup'

import Login from './views/Login'
import Home from './views/Home'
import Profile from './views/Profile'
import ProfileSettings from "./views/ProfileSettings"
import SignUp from './views/SignUp'
import NotFound from './views/NotFound'

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
    } //logInSubmit()

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
    } //signUpSubmit()

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
            <Button className='headerLink' pathTo='/' text='Home'/>
            <Button className='headerLink' pathTo='/profile' text='Profile'/>
            {user ? <Button className='button primary logout' onClick={toggleLogout} text='Settings'/> : ''}
            {showLogout ? <Logout setUser={setUser} setShowLogout={setShowLogout} history={history}/> : ''}

            <Switch>
                <Route exact path='/'>
                    {user ? <Home /> : <Redirect to="/login" />}
                </Route>

                <Route exact path='/login'>
                    <Login inputFunctions = {loginProps}/>
                </Route>

                <Route exact path='/profile'>
                    {user ? <Profile /> : <Redirect to="/login" />}
                </Route>

                <Route path='/settings'>
                    {user ? <ProfileSettings /> : <Redirect to="/login" />}
                </Route>

                <Route exact path='/signup'>
                    <SignUp inputFunctions = {signUpProps}/>
                </Route>

                <Route path="">
                    <NotFound />

                </Route>
            </Switch>
        </div>
    ) //return
} //App

export default App
