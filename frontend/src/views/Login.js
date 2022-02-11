import React from "react"
import '../styles/Login.css'

const Login = (props) => {
    const { submit, username, usernameHandler, password, passwordHandler } = props.inputFunctions

    return (
        <div className="loginModal">
            <h1>Purdue Circle</h1>
            <div className="inputContainer">
                <form onSubmit={submit}>
                    <h3>Login</h3>
                    <div className="field">
                        <input value={username} onChange={usernameHandler} placeholder={'username'}/>
                    </div>
                    <div className="field">
                        <input type={"password"} value={password} onChange={passwordHandler} placeholder={'password'}/>
                    </div>
                    <div>
                        <input type={"submit"} value={"login"}/>
                        {/* <button type="submit">login</button> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
