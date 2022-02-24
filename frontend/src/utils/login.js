import axios from "axios"
const login = (request, history) => {
    //TODO change this?
    let output = 'Invalid email / password combination'

    //input validation
    if (request.username === '' || request.password === '') {
        return 'A field is empty'
    }

    if (!(request.username.includes('@') && request.username.includes('.'))) {
        //is email
    } else {
        //is username
    }

    axios.post("/api/user/login", {
                "credentials":request.username,
                "password":request.password
            },{
                withCredentials: true, credentials:"include"
            }
        ).then(response => {
            output = 'allGood'
            console.log("login response", response);
            if (response.data.success) {
                console.log("login success");
                history.push('/')
            }
        }) 
        .catch(error => {
            //TODO change this?
            output = 'Invalid email / password combination'
            console.log("axios login error", error)
        })

        console.log("login.js output:", output);
    return output
} //login()

const signUp = (request, history) => {
    //TODO change this?
    let output = 'Username/email already in use, do you want to login?'

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
            output = 'allGood'
            if (response.data.success) {
                history.push('/')
            }
        }).catch(error => {
            //TODO change this
            console.log("axios signup error", error);
            return 'Username/email already in use'
        })

    //TODO replace with cookie?

    return output
} //signUp()

export { signUp, login }
