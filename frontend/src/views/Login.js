import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

import '../styles/Login.css'
import Field from "../components/Field"
import { ButtonBlue, ButtonLink } from '../components/Button'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()

    const loginSubmit = (e) => {
        e.preventDefault()

        if (username === '') {
            setErrorMessage({ field: 'username', message: 'Username field is empty' })
            return
        } else if (password === '') {
            setErrorMessage({ field: 'password', message: 'Password field is empty' })
            return
        } else if (password.length > 32) {
            setErrorMessage({ field: 'password', message: 'Cannot exceed 32 characters' })
            return
        } else if (username.length > 32) {
            setErrorMessage({ field: 'username', message: 'Cannot exceed 32 characters' })
            return
        }

        axios.post("/api/auth/login", {
            "credentials":username,
            password
        },{
            withCredentials: true, credentials:"include"
        }).then(response => {
            if (response.data.success) {
                history.push('/')
            } else {
                console.log('invalid login');
                setErrorMessage({ field: 'all', message: 'Invalid email / password combination' })
                setPassword('')
            }
        }).catch(error => {
            //TODO change this?
            console.log('login not found');
            setErrorMessage({ field: 'all', message: 'Invalid email / password combination' })
            setPassword('')
        })
    } //loginSubmit()

    const usernameHandler = (e) => {
        setErrorMessage(null)
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setErrorMessage(null)
        setPassword(e.target.value)
    }

    const hasError = (input) => {
        if (errorMessage && errorMessage.field === input){
            return 'fieldError'
        } else {
            return ''
        }
    } //hasError()

    return (
        <div className="contents login">
            <div className="formContainer">
                <form onSubmit={loginSubmit}>
                    <h1>Log in</h1>
                    {errorMessage ? <div className='message error'>{errorMessage.message}</div> : ''}
                    <Field className={`singleLine ${hasError('username') || hasError('all')}`} value={username} onChange={usernameHandler} placeholder={'Username or email'}/>
                    <Field className={`singleLine ${hasError('password') || hasError('all')}`} type={'password'} value={password} onChange={passwordHandler} placeholder={'Password'}/>
                    <div className="buttonContainer">
                        <ButtonBlue type={'formSubmit'} className={'formSubmit'} text={'Login'}/>
                    </div>
                    <div className="linkContainer">
                        Don't have an account?
                        <ButtonLink pathTo={'/signup'} text={'Sign up'}/>
                    </div>
                </form>
            </div>
        </div>
    ) //return
} //Login

export default Login
