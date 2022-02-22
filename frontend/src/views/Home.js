import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"

const Home = () => {
    const history = useHistory()
    redirectIfNotAuth(history)
    

    console.log("home");

    return (
        <div className="contents home">
            <h1>Home</h1>
        </div>
    )
}

export default Home