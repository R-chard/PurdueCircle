import React from "react"
import {Link} from "react-router-dom"

import '../styles/Login.css'

const Login = (props) => {
    const { submit, username, usernameHandler, password, passwordHandler} = props.inputFunctions

    return (
        <div className="contents">
            <div className="formContainer">
                <form onSubmit={submit}>
                <h1>Login</h1>
                    {/* <h3>Login</h3> */}
                    <div className="field">
                        <input value={username} onChange={usernameHandler} placeholder={'Username or email'}/>
                    </div>
                    <div className="field">
                        <input type={"password"} value={password} onChange={passwordHandler} placeholder={'Password'}/>
                    </div>
                    <div className="buttonContainer">
                        <input type={"submit"} value={"Login"}/>
                        {/* <button type="submit">login</button> */}
                    </div>
                </form>
                <div className="linkContainer">
                    {/* <button onClick={changeViewHandler}>Sign up</button> */}
                    Don't have an account?
                    <Link to='/signup' className='link'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
