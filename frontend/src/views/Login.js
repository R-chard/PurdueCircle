import React, { useEffect } from "react"

import '../styles/Login.css'

import Field from "../components/Field"
import Button from "../components/Button"

const Login = (props) => {
    const { submit, username, usernameHandler, password, passwordHandler, successMessage, setSuccessMessage} = props.inputFunctions

    const submitHandler = (e) => {
        submit(e)
    }

    // TODO change this?
    useEffect(() => {
        setSuccessMessage(null)
    }, [])

    return (
        <div className="contents login">
            <div className="formContainer">
                <form onSubmit={submitHandler}>
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
