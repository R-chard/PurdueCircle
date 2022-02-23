import axios from "axios"
const login = (request, history) => {
    const port = 3001

    //input validation
    if (request.username === '' || request.password === '') {
        return 'A field is empty'
    }


    //TODO add api call, check if response is good


    //TODO replace with cookie?
    history.push('/')

    return 'allGood'
} //login()

const signUp = (request, history) => {
    const port = 3001

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
                "username":"tom",
                "email": "asdf@gmail.com",
                "password":"1233"
            },{
                withCredentials: true, credentials:"include"
            }
        ).then(response => {
            console.log("response", response)
            if (response.isValid) {
                history.push('/')
            }
        }) 

    //TODO replace with cookie?

    return 'allGood'
}

export { signUp, login }
