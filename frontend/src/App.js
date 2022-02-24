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
import CreatePost from './views/CreatePost.js'

const App = () => {
    const [showPopup, setShowPopup] = useState(false)

    //CHECK change this?
    const page = useLocation()
    // console.log("page", page);
    let showWhenLoggedIn = true
    let showCreatePostButton = true
    
    if (page.pathname === '/login' || page.pathname === '/signup') {
        showWhenLoggedIn = false
    }

    if (page.pathname === '/create') {
        showCreatePostButton = false
    }

    //toggles showLogout state when logout button is clicked
    const toggleLogout = () => {
        setShowPopup(showPopup ? false : true)
    }

    return (
        <div className="app">
            <nav className='header'>
                <Button className='button primary headerButton' pathTo='/' text='Home'/>
                {showWhenLoggedIn ? <Button className='button headerButton' pathTo='/profile' text='Profile'/> : ''}
                {showWhenLoggedIn && showCreatePostButton ? <Button className='button primary headerButton' pathTo='/create' text='New Post' /> : ''}
                {showWhenLoggedIn ? <Button className='button primary logout headerButton' onClick={toggleLogout} text='Settings'/> : ''}
                {showPopup ? <Popup setShowPopup={setShowPopup} /> : ''}
            </nav>

            <div className='body'>
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
                        <ProfileSettings />
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

                    <Route exact path='/create'>
                        <CreatePost />
                    </Route>

                    <Route path="">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    ) //return
} //App

export default App
