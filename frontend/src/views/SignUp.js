import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import '../styles/Login.css'

import { signUp } from '../utils/login'

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

    const signUpSubmit = (e) => {
        e.preventDefault()

        //TODO replace with correct object
        const formObject = {
            name, username, email, password, confirmPassword
        }

        //uses util to validate & send to api
        const output = signUp(formObject, history)

        //CHECK if unsuccessful
        if (output !== 'allGood') {
            setSuccessMessage(output)
            return false
        }

        //REMOVE?
        console.log("Sign up object: ", formObject)
        setUsername('')
        setPassword('')
        setConfirmPassword('')
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
                    {!successMessage ? '': <div className='message'>{successMessage}</div>}
                    <Field value={name} onChange={nameHandler} placeholder={'Name'} />
                    <Field value={email} onChange={emailHandler} placeholder={'Email'} />
                    <Field value={username} onChange={usernameHandler} placeholder={'Username'} />
                    <Field type={"password"} value={password} onChange={passwordHandler} placeholder={'Password'} />
                    <Field type={"password"} value={confirmPassword} onChange={confirmPasswordHandler} placeholder={'Confirm password'} />
                    <div className="buttonContainer">
                        <Button type={'formSubmit'} text={"Sign up"}/>
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
