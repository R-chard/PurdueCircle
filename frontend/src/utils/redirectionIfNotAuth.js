import axios from "axios"

const redirectIfNotAuth = (history) => {
    axios.get("http://localhost:3001/api/user/validate",{
        withCredentials: true, credentials:"include"
    })
        .then(function(response){
            if (response.status == 403){
                history.push("/login")
            }
        })
        .catch(function(response){
            console.log("axios error", response);
            history.push("/login")
        })
}

export default redirectIfNotAuth