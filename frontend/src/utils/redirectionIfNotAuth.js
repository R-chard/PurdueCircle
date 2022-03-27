import axios from "axios"

const redirectIfNotAuth = (history, showPage) => {
    return axios.get("/api/auth/validate",{
        withCredentials: true, credentials:"include"
    })
}

export default redirectIfNotAuth