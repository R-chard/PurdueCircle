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
    var output = 'failed'
    if (request.username !== '' && request.username !== 'failed')
        output = 'good'

    if (output !== 'failed') {
        setUser(request)
        history.push('/')
    }
    //
    
    return output
} //login()

const signUp = (request, setUser, history) => {
    //TODO replace with API call with proper checks
    var output = 'failed'
    if (request.username !== '' && request.username !== 'failed')
        output = 'good'

    if (output !== 'failed') {
        setUser(request)
        history.push('/')
    }
    //

    return output
}

export {signUp, login}