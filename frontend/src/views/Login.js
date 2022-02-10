import React from "react"
import { Link } from "react-router-dom"
import '../styles/Login.css'

const Login = (props) => {
    const {inputFunctions} = props

    return (
        <div className="loginView">
            <h1>Purdue Circle</h1>
            <InputField inputFunctions={inputFunctions}/>
        </div>
    )
}

const InputField = (props) => {
    // console.log("input field", props);
    const { submit, username, usernameHandler, password, passwordHandler } = props.inputFunctions

    return (
        <div className="inputBox">
            <form onSubmit={submit}>
                <div className="field">
                    Username: <input value={username} onChange={usernameHandler} />
                </div>
                <div className="field">
                    Password: <input type={"password"} value={password} onChange={passwordHandler} />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
