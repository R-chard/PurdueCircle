import React, { useState } from 'react'
import Login from './components/Login'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    console.log('render')

    const loginSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')

        const loginObject = {
            username: username,
            password: password,
        }

        console.log(loginObject)
        setUsername('')
        setPassword('')
    }

    const usernameHandler = (e) => {
        // console.log('username handler')
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        // console.log('password handler')
        setPassword(e.target.value)
    }

    return (
        <div className="App">
            <p>asdf</p>
            <Login
                submit={loginSubmit}
                usernameHandler={usernameHandler}
                passwordHandler={passwordHandler}
                username={username}
                password={password}
            />
        </div>
    )
}

export default App
