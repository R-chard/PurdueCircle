import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from "react-router-dom" 

import './styles/App.css'

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
import PrivateRoute from './components/PrivateRoute'
import PostView from './components/PostView'

const App = () => {

    useEffect(() => {
        document.body.classList.add('colorAuto')
    }, [])
    
    
    
    return (
        <div className="app">
            <div className='body'>
                <Switch>
                    <Route exact path='/'>
                        <PrivateRoute component={Home}/>
                    </Route>

                    <Route exact path='/home'>
                        <Redirect to={'/'} />
                    </Route>

                    <Route exact path='/login'>
                        <Login />
                    </Route>

                    <Route exact path='/signup'>
                        <SignUp />
                    </Route>

                    <Route exact path='/profile'>
                        <PrivateRoute component={Profile}/>
                    </Route>

                    <Route exact path='/profile/settings'>
                        <PrivateRoute component={ProfileSettings}/>
                    </Route>

                    <Route exact path='/profile/followers'>
                        <PrivateRoute component={Followers}/>
                    </Route>

                    <Route exact path='/profile/following'>
                        <PrivateRoute component={Following}/>
                    </Route>

                    <Route exact path='/profile/topics'>
                        <PrivateRoute component={Topics}/>
                    </Route>

                    <Route exact path='/create'>
                        <PrivateRoute component={CreatePost}/>
                    </Route>

                    <Route exact path='/post'>
                        <PrivateRoute component={PostView} />
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
