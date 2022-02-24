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
    const [successMessage, setSuccessMessage] = useState(null)
    const history = useHistory()

    const signUp = (request) => {
        //TODO change this?
        let output = 'Username/email already in use, do you want to login?'
    
        //input validation
        if (request.name === '' || request.email === '' || request.username === '' || request.password === '' ||
            request.confirmPassword === '') {
    
            setSuccessMessage('A field is empty')
            return
        }
    
        if (request.password.length < 8) {
            setSuccessMessage('Password length is too short')
            return
        }
    
        if (request.password !== request.confirmPassword) {
            setSuccessMessage("Passwords don't match")
            return
        }
    
        if (!(request.email.includes('@') && request.email.includes('.'))) {
            setSuccessMessage('Invalid email format')
            return
        }
      
        axios.post("/api/user/signup", {
                    "name":request.name,
                    "username":request.username,
                    "email": request.email,
                    "password":request.password
                },{
                    withCredentials: true, credentials:"include"
                }
            ).then(response => {
                output = 'allGood'
                if (response.data.success) {
                    history.push('/')
                }
            }).catch(error => {
                //TODO change this
                console.log("axios signup error", error);
                setSuccessMessage('Username/email already in use')
            })
    
        //TODO replace with cookie?
    
        return output
    } //signUp()

    const signUpSubmit = (e) => {
        e.preventDefault()

        //CHECK if unsuccessful
        let errorMessage = ""
        if (name === '' || email === '' || username === '' || password === '' ||
            confirmPassword === '') {
                errorMessage ='A field is empty'
        
        } else if (password.length < 8){
            errorMessage = 'Password length is too short'

        } else if (password !== confirmPassword) {
            errorMessage = "Passwords don't match"

        } else if (!(email.includes('@') && email.includes('.'))) {
            errorMessage = 'Invalid email format'
        }

        // return if unsuccessful
        if (errorMessage) {
            setSuccessMessage(errorMessage)
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setName('')
            setEmail('')
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
            }
        }).catch(error => {
            setSuccessMessage('Username/email already in use, do you want to login?')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setName('')
            setEmail('')
        })
    }

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

    return (
        <div className="contents login">
            <div className="formContainer">
                <form onSubmit={signUpSubmit}>
                    <h1>Sign up</h1>
                    {!successMessage ? '': <div className='message error'>{successMessage}</div>}
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
