import axios from "axios"
const login = (request, history) => {

    //input validation
    if (request.username === '' || request.password === '') {
        return 'A field is empty'
    }
    //TODO add api call, check if response is good
    axios.post("http://localhost:3001/api/user/login", {
                "credentials":request.username,
                "password":request.password
            },{
                withCredentials: true, credentials:"include"
            }
        ).then(response => {
            if (response.data.isValid) {
                history.push('/')
            }
        }) 
        .catch(error => {
            console.log("axios login error", error);
        })

    return 'allGood'
}

const signUp = (request, history) => {

    //input validation
    if (request.name === '' || request.email === '' || request.username === '' || request.password === '' ||
        request.confirmPassword === '') {

        return 'A field is empty'
    }

    if (request.password.length < 8)
        return 'Password length is too short'

    if (request.password !== request.confirmPassword) {
        return "Passwords don't match"
    }

    axios.post("http://localhost:3001/api/user/signup", {
                "name":request.name,
                "username":request.username,
                "email": request.email,
                "password":request.password
            },{
                withCredentials: true, credentials:"include"
            }
        ).then(response => {
            if (response.data.isValid) {
                history.push('/')
            }
        }).catch(error => {
            console.log("axios signup error", error);
        })

    //TODO replace with cookie?

    return 'allGood'
}

export { signUp, login }
