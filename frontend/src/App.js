import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from "react-router-dom" 
import 'bootstrap/dist/css/bootstrap.css';

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
import PostView from './views/PostView'
import SearchBar from './components/SearchBar'
import PostsByTopic from './views/PostsByTopic'

const App = () => {

    useEffect(() => {
        document.body.classList.add('colorAuto')
    }, [])
    
    return (
        <div className='app'>
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

                    <Route path="/topictitle">
                        <PrivateRoute component={PostsByTopic} />
                    </Route>

                    <Route path='/profile'>
                        <PrivateRoute component={Profile}/>
                    </Route>

                    <Route exact path='/settings'>
                        <PrivateRoute component={ProfileSettings}/>
                    </Route>

                    <Route path='/followers'>
                        <PrivateRoute component={Followers}/>
                    </Route>

                    <Route path='/following'>
                        <PrivateRoute component={Following}/>
                    </Route>

                    <Route path='/topics'>
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
    ) //return
} //App

export default App
