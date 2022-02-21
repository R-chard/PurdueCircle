const login = (request, setUser, history) => {
    const port = 3001

    //TODO check if response is good
    // const output = fetch(`http://localhost:${port}/api/user/signup`,{
    //         method:"POST",
    //         // means the contents we are sending is in JSON
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         // converts request to json
    //         body:JSON.stringify(request)
    //     })
    //     .then(response=>response.json())
    //     .then(response=>{
    //         setUser(response.signedIn)
    //         history.push('/')
    //     })
    // console.log("Login: ", output);

    //TODO remove and use above API call with proper checks

    if (request.username === '' || request.password === '') {
        return 'A field is empty'
    }

    setUser(request)
    history.push('/')
    return 'allGood'
} //login()

const signUp = (request, setUser, history) => {
    //TODO add API call with proper checks?

    if (request.name === '' || request.email === '' || request.username === '' || request.password === '' ||
        request.confirmPassword === '') {

        return 'A field is empty'
    }

    if (request.password.length < 8)
        return 'Password length is too short'

    if (request.password !== request.confirmPassword) {
        return "Passwords don't match"
    }

    setUser(request)
    history.push('/')
    return 'allGood'
}

export { signUp, login }
