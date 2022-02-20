import React from "react"

import '../styles/Login.css'

import Field from "../components/Field"
import Button from "../components/Button"

const Login = (props) => {
    const { submit, username, usernameHandler, password, passwordHandler} = props.inputFunctions

    return (
        <div className="contents login">
            <div className="formContainer">
                <form onSubmit={submit}>
                    <h1>Log in</h1>
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
