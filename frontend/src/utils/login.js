import axios from "axios"
const login = (request, history) => {

    //input validation
    if (request.username === '' || request.password === '') {
        return 'A field is empty'
    }

    if (!(request.username.includes('@') && request.username.includes('.'))) {
        //is email
    } else {
        //is username
    }

    //TODO add api call, check if response is good
    axios.post("/api/user/login", {
                "credentials":request.username,
                "password":request.password
            },{
                withCredentials: true, credentials:"include"
            }
        ).then(response => {
            if (response.data.success) {
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

    if (!(request.email.includes('@') && request.email.includes('.'))) {
        return 'Invalid email format'
    }
  
    axios.post("/api/user/signup", {
                "name":request.name,
                "username":request.username,
                "email": request.email,
                "password":request.password
            },{
                withCredentials: true, credentials:"include"
            }
        ).then(response => {
            if (response.data.success) {
                history.push('/')
            }
        }).catch(error => {
            console.log("axios signup error", error);
        })

    //TODO replace with cookie?

    return 'allGood'
}

export { signUp, login }
