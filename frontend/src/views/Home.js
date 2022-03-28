import React from "react"
import SearchBar from "../components/SearchBar"

import '../styles/Home.css'
import '../components/PostView'

const Home = () => {

    return (
        <div className="contents home">
            <h1>Home</h1>
            <SearchBar />
        </div>
    )
}

export default Home