import React from "react"
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"

const Home = () => {
    redirectIfNotAuth()

    return (
        <div className="contents home">
            <h1>Home</h1>
        </div>
    )
}

export default Home