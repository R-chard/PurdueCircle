import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import '../styles/Login.css'

import { login } from '../utils/login'

import Field from "../components/Field"
import Button from "../components/Button"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()

    const loginSubmit = (e) => {
        e.preventDefault()

        //TODO replace with correct object
        const formObject = {
            username,
            password,
        }

        //uses util to validate & send to api
        const output = login(formObject, history)

        //CHECK if unsuccessful
        if (output !== 'allGood') {
            console.log('not all good login')
            setErrorMessage(output)
            return false
        }

        //REMOVE?
        console.log("Login object: ", formObject)
        setUsername('')
        setPassword('')

        return true
    } //logInSubmit()

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
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
