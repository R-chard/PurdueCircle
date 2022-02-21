import React, { useState } from 'react'
import {Redirect, Route, Switch, useHistory} from "react-router-dom" 

import './styles/App.css'

import {login, signUp} from './utils/login'

import Button from './components/Button'
import Logout from './components/Popup'

import Login from './views/Login'
import Home from './views/Home'
import Profile from './views/Profile'
import Followers from './views/Followers'
import Following from './views/Following'
import Topics from './views/Topics'
import ProfileSettings from "./views/ProfileSettings"
import SignUp from './views/SignUp'
import NotFound from './views/NotFound'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState(null)
    const [showLogout, setShowLogout] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)
    const history = useHistory()

    //handler for login page submission
    const loginSubmit = (e) => {
        e.preventDefault()

        const formObject = {
            username,
            email: 'asdf@gmail.com',
            password,
        }

        const output = login(formObject, setUser, history)

        //TODO check if unsuccessful
        if (output !== 'allGood') {
            setSuccessMessage(output)
            return false
        }

        console.log("Login object: ", formObject)
        setUsername('')
        setPassword('')

        return true
    } //logInSubmit()

    //handler for sign-up page submission
    const signUpSubmit = (e) => {
        e.preventDefault()

        //TODO do checks in real time?
        const formObject = {
            username, email, password, confirmPassword, name
        }

        const output = signUp(formObject, setUser, history)

        //TODO check if unsuccessful
        if (output !== 'allGood') {
            setSuccessMessage(output)
            return false
        }

        console.log("Sign up object: ", formObject)
        setUsername('')
        setPassword('')
        setName('')
        setEmail('')

        return true
    } //signUpSubmit()

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    //props for login page
    const loginProps = {
        "submit": loginSubmit,
        username,
        password,
        usernameHandler,
        passwordHandler,
        successMessage, 
        setSuccessMessage
    }

    //props for sign-up page
    const signUpProps = {
        "submit": signUpSubmit,
        username,
        password,
        confirmPassword,
        name,
        email,
        usernameHandler,
        passwordHandler,
        confirmPasswordHandler,
        nameHandler,
        emailHandler,
        successMessage, 
        setSuccessMessage
    }

    //toggles showLogout state when logout button is clicked
    const toggleLogout = () => {
        setShowLogout(showLogout ? false : true)
    }

    return (
        <div className="App">
            <Button className='link headerLink' pathTo='/' text='Home'/>
            <Button className='link headerLink' pathTo='/profile' text='Profile'/>
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

                <Route exact path='/profile/settings'>
                    {user ? <ProfileSettings inputFunctions = {loginProps}/> : <Redirect to="/login" />}
                </Route>

                <Route exact path='/profile/followers'>
                    {user ? <Followers /> : <Redirect to="/login" />}
                </Route>

                <Route exact path='/profile/following'>
                    {user ? <Following /> : <Redirect to="/login" />}
                </Route>

                <Route exact path='/profile/topics'>
                    {user ? <Topics /> : <Redirect to="/login" />}
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
