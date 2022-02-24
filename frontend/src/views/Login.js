import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

import '../styles/Login.css'
import Field from "../components/Field"
import Button from "../components/Button"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()

    const loginSubmit = (e) => {
        e.preventDefault()

        if (username === '' || password === '') {
            setErrorMessage('A field is empty')
            return
        }

        axios.post("/api/user/login", {
            "credentials":username,
            password
        },{
            withCredentials: true, credentials:"include"
        }).then(response => {
            if (response.data.success) {
                history.push('/')
            } else{
                console.log('invalid login');
                setErrorMessage('Invalid email / password combination')
                setPassword('')
            }
        }).catch(error => {
            //TODO change this?
            console.log('login not found');
            setErrorMessage('Invalid email / password combination')
            setPassword('')
        })

    }

    const usernameHandler = (e) => {
        setErrorMessage(null)
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setErrorMessage(null)
        setPassword(e.target.value)
    }

    let fieldMod = ''
    // if (errorMessage) {
    //     fieldMod = 'fieldError'
    // }

    return (
        <div className="contents login">
            <div className="formContainer">
                <form onSubmit={loginSubmit}>
                    <h1>Log in</h1>
                    {errorMessage ? <div className='message error'>{errorMessage}</div> : ''}
                    <Field className={`singleLine ${fieldMod}`} value={username} onChange={usernameHandler} placeholder={'Username or email'}/>
                    <Field className={`singleLine ${fieldMod}`} type={'password'} value={password} onChange={passwordHandler} placeholder={'Password'}/>
                    <div className="buttonContainer">
                        <Button className={'formSubmit'} text={'Login'}/>
                    </div>
                    <div className="linkContainer">
                        Don't have an account?
                        <Button className={'link'} pathTo={'/signup'} text={'Sign up'}/>
                    </div>
                </form>
            </div>
        </div>
    ) //return
} //Login

export default Login
