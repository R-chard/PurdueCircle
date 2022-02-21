import React, { useEffect } from "react"

import '../styles/Login.css'

import Field from "../components/Field"
import Button from "../components/Button"

const SignUp = (props) => {
    const { 
        submit, username, usernameHandler, password, passwordHandler, confirmPassword, confirmPasswordHandler,
        name, nameHandler, email, emailHandler, successMessage, setSuccessMessage
    } = props.inputFunctions

    const submitHandler = (e) => {
        submit(e)
    }

    // TODO change this?
    useEffect(() => {
        setSuccessMessage(true)
    }, [])

    return (
        <div className="contents login">
            <div className="formContainer">
                <form onSubmit={submitHandler}>
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
