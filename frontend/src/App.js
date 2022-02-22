import React, { useState } from 'react'
import { Route, Switch, useLocation } from "react-router-dom" 

import './styles/App.css'

import Button from './components/Button'
import Popup from './components/Popup'

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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState(null)
    const [showLogout, setShowLogout] = useState(false)
    const [success, setSuccess] = useState(true)
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
        if (output === 'failed')
            return false

        console.log("Login object: ", formObject)
        setUsername(formObject.username)
        setPassword(formObject.password)

        return true
    } //logInSubmit()

    //handler for sign-up page submission
    const signUpSubmit = (e) => {
        e.preventDefault()

        const formObject = {
            username, email, password, name
        }

        const output = signUp(formObject, setUser, history)

        //TODO check if unsuccessful
        if (output === 'failed')
            return false

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
        success, 
        setSuccess
    }

    //props for sign-up page
    const signUpProps = {
        "submit": signUpSubmit,
        username,
        password,
        name,
        email,
        usernameHandler,
        passwordHandler,
        nameHandler,
        emailHandler,
        success, 
        setSuccess
    }
    
    const [showPopup, setShowPopup] = useState(false)

    //CHECK change this?
    const page = useLocation()
    // console.log("page", page);
    let showButton = true
    
    if (page.pathname === '/login' || page.pathname === '/signup') {
        showButton = false
    }

    //props for profile
    const profileProps = {
        username
    }

    //toggles showLogout state when logout button is clicked
    const toggleLogout = () => {
        setShowPopup(showPopup ? false : true)
    }

    return (
        <div className="App">
            <Button className='link headerLink' pathTo='/' text='Home'/>
            <Button className='link headerLink' pathTo='/profile' text='Profile'/>
            {showButton ? <Button className='button primary logout' onClick={toggleLogout} text='Settings'/> : ''}
            {showPopup ? <Popup setShowPopup={setShowPopup} /> : ''}

            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>

                <Route exact path='/login'>
                    <Login />
                </Route>

                <Route exact path='/signup'>
                    <SignUp />
                </Route>

                <Route exact path='/profile'>
                    <Profile />
                </Route>

                <Route exact path='/profile/settings'>
                    {/* {user ? <ProfileSettings inputFunctions = {null}/> : <Redirect to="/login" />} */}
                    <ProfileSettings inputFunctions={profileProps}/>
                </Route>

                <Route exact path='/profile/followers'>
                    {/* {user ? <Followers /> : <Redirect to="/login" />} */}
                    <Followers />
                </Route>

                <Route exact path='/profile/following'>
                    {/* {user ? <Following /> : <Redirect to="/login" />} */}
                    <Following />
                </Route>

                <Route exact path='/profile/topics'>
                    {/* {user ? <Topics /> : <Redirect to="/login" />} */}
                    <Topics />
                </Route>

                <Route path="">
                    <NotFound />
                </Route>
            </Switch>
        </div>
    ) //return
} //App

export default App
