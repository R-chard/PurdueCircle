const Login = (props) => {
    const { submit, username, usernameHandler, password, passwordHandler } = props

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Username: <input value={username} onChange={usernameHandler} />
                </div>
                <div>
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
