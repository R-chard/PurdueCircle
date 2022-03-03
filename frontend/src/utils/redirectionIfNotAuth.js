import axios from "axios"

const redirectIfNotAuth = (history, showPage) => {
    return axios.get("/api/user/validate",{
        withCredentials: true, credentials:"include"
    })
}

export default redirectIfNotAuth