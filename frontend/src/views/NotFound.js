import React from "react"
import {Link} from "react-router-dom"
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"

const NotFound = () => {
    return (
        <div>
            <h2>Sorry...</h2>
            <p>That page cannot be found</p>
            <p>Click <Link to="/">here</Link> to get back to the home page</p>
        </div>
    )
}

export default NotFound