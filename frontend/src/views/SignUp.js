import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import '../styles/Login.css'

import Field from "../components/Field"
import Button from "../components/Button"

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()

    const signUpSubmit = (e) => {
        e.preventDefault()

        //CHECK if unsuccessful
        let errorMessage = ""
        if (name === '' || email === '' || username === '' || password === '' ||
            confirmPassword === '') {
                errorMessage ='A field is empty'
        
        } else if (password.length < 8) {
            errorMessage = 'Password length is too short'

        } else if (password !== confirmPassword) {
            errorMessage = "Passwords don't match"

        } else if (!(email.includes('@') && email.includes('.'))) {
            errorMessage = 'Invalid email format'
        }

        // return if unsuccessful
        if (errorMessage) {
            setErrorMessage(errorMessage)
            return
        }

        axios.post("/api/user/signup", {
            name,
            username,
            email,
            password
        },{
            withCredentials: true, credentials:"include"
        }).then(response => {
            if (response.data.success) {
                history.push('/')
            } else {
                console.log('signup not success');
                setErrorMessage('Username/email already in use, do you want to login?')
            }
        }).catch(error => {
            console.log('signup error');
            setErrorMessage('Username/email already in use, do you want to login?')
        })
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value)
        setErrorMessage(null)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        setErrorMessage(null)
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
        setErrorMessage(null)
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        setErrorMessage(null)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        setErrorMessage(null)
    }

    return (
        <div className="contents login">
            <div className="formContainer">
                <form onSubmit={signUpSubmit}>
                    <h1>Sign up</h1>
                    {!errorMessage ? '': <div className='message error'>{errorMessage}</div>}
                    <Field className={'singleLine'} value={name} onChange={nameHandler} placeholder={'Name'} />
                    <Field className={'singleLine'} value={email} onChange={emailHandler} placeholder={'Email'} />
                    <Field className={'singleLine'} value={username} onChange={usernameHandler} placeholder={'Username'} />
                    <Field className={'singleLine'} type={"password"} value={password} onChange={passwordHandler} placeholder={'Password'} />
                    <Field className={'singleLine'} type={"password"} value={confirmPassword} onChange={confirmPasswordHandler} placeholder={'Confirm password'} />
                    <div className="buttonContainer">
                        <Button className={'formSubmit'} text={"Sign up"}/>
                    </div>
                    <div className="linkContainer">
                        Have an account?
                        <Button className='link' pathTo='/login' text='Log in'/>
                    </div>
                </form>
            </div>
        </div>
    ) //return
} //SignUp

export default SignUp
