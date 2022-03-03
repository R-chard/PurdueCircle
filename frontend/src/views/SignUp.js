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
    // const [usernameError, setUsernameError] = useState(null)
    // const [passwordError, setPasswordError] = useState(null)
    // const [confirmError, setConfirmError] = useState(null)
    // const [nameError, setNameError] = useState(null)
    // const [emailError, setEmailError] = useState(null)

    const history = useHistory()

    const signUpSubmit = (e) => {
        e.preventDefault()

        //this temporary message is used because setState is not done immediately
        let tempMessage = ''
        if (name === '') {
            tempMessage = { field: 'name', message: 'Name field is empty' }

        } else if (email === '') {
            tempMessage = { field: 'email', message: 'Email field is empty' }

        } else if (username === '') {
            tempMessage = { field: 'username', message: 'Username field is empty' }
            
        } else if (password === '') {
            tempMessage = { field: 'password', message: 'Password field is empty' }

        } else if (confirmPassword === '') {
            tempMessage = { field: 'confirmPassword', message: 'Confirm password field is empty' }

        } else if (password.length < 8) {
            tempMessage = { field: 'password', message: 'Password length is too short' }

        } else if (password !== confirmPassword) {
            tempMessage = { field: 'allPass', message: "Passwords don't match" }

        } else if (!(email.includes('@') && email.includes('.'))) {
            tempMessage = { field: 'email', message: 'Invalid email format' }

        }

        // return if unsuccessful
        if (tempMessage) {
            console.log("error caught");
            setErrorMessage(tempMessage)
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
                setErrorMessage( {field: '', message: 'Username/email already in use, do you want to login?'} )
            }
        }).catch(error => {
            console.log('signup error');
            setErrorMessage({ field: '', message: 'Username/email already in use, do you want to login?' })
        })
    } //signUpSubmit

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
                <form onSubmit={signUpSubmit}>
                    <h1>Sign up</h1>
                    {errorMessage ? <div className='message error'>{errorMessage.message}</div> : ''}
                    <Field className={`singleLine ${hasError('name')}`} value={name} onChange={nameHandler} placeholder={'Name'} />
                    <Field className={`singleLine ${hasError('email')}`} value={email} onChange={emailHandler} placeholder={'Email'} />
                    <Field className={`singleLine ${hasError('username')}`} value={username} onChange={usernameHandler} placeholder={'Username'} />
                    <Field className={`singleLine ${hasError('password') || hasError('allPass')}`} type={"password"} value={password} onChange={passwordHandler} placeholder={'Password'} />
                    <Field className={`singleLine ${hasError('confirmPassword') || hasError('allPass')}`} type={"password"} value={confirmPassword} onChange={confirmPasswordHandler} placeholder={'Confirm password'} />
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
