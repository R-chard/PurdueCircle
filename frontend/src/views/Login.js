import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import '../styles/Login.css'

import { login } from '../utils/login'

import Field from "../components/Field"
import Button from "../components/Button"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
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
            setSuccessMessage(output)
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

    return (
        <div className="contents login">
            <div className="formContainer">
                <form onSubmit={loginSubmit}>
                    <h1>Log in</h1>
                    {!successMessage ? '': <div className='message'>{successMessage}</div>}
                    <Field value={username} onChange={usernameHandler} placeholder={'Username or email'}/>
                    <Field type={'password'} value={password} onChange={passwordHandler} placeholder={'Password'}/>
                    <div className="buttonContainer">
                        <Button type={'formSubmit'} text={'Login'}/>
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
