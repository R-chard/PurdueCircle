import React from "react"
import '../styles/Login.css'

const Login = (props) => {
    const { submit, username, usernameHandler, password, passwordHandler } = props.inputFunctions

    return (
        <div className="loginSection container">
            <div className="row">
                <div className="loginModal">
                    <h1>Purdue Circle</h1>
                    <div className="inputContainer">
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
                </div>
            </div>
        </div>
    )
}

export default Login
