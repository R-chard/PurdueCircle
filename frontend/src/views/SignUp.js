import React from "react"
import { Link } from "react-router-dom"

import '../styles/Login.css'

const SignUp = (props) => {
    const { submit, 
        username, usernameHandler, 
        password, passwordHandler,
        name, nameHandler,
        email, emailHandler
    } = props.inputFunctions

    return (
        <div className="contents">
            <div className="formContainer">
                <form onSubmit={submit}>
                    <h1>Sign up</h1>
                    <input value={name} onChange={nameHandler} placeholder={'Name'} className='field'/>
                    <input value={email} onChange={emailHandler} placeholder={'Email'} className='field'/>
                    <input value={username} onChange={usernameHandler} placeholder={'Username'} className='field'/>
                    <input type={"password"} value={password} onChange={passwordHandler} placeholder={'Password'} className='field'/>
                    <div className="buttonContainer">
                        <input type={"submit"} value={"Sign up"}/>
                    </div>
                    <div className="linkContainer">
                        {/* <button onClick={changeViewHandler}>Sign up</button> */}
                        Have an account?
                        <Link to='/login' className='link'>Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
