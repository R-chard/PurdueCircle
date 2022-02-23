import axios from "axios"

const redirectIfNotAuth = (history) => {
    axios.get("/api/user/validate",{
        withCredentials: true, credentials:"include"
    })
        .then(function(response){
            if (response.status == 403){
                history.push("/login")
            }
        })
        .catch(function(response){
            history.push("/login")
        })
}

export default redirectIfNotAuth