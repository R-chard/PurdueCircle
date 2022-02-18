const login = (request) => {
    const port = 3001

    const output = request
    console.log("Login: ", output);
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

        return output
} //login()

const signUp = (request) => {
    const output = request
    console.log("sign up: ", output);

    return output
}

export {signUp, login}