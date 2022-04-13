import React from "react"
import {Link} from "react-router-dom"

import '../styles/NotFound.css'

const NotFound = () => {
    return (
        <div className='contents not-found'>
            <p>Page not found. <Link to="/">Go back to home page?</Link></p>
        </div>
    )
}

export default NotFound