import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Main from "./pages/Main/Main"
// This page is for routing
const RoutingTable = () => {
    return(
        <Router>
            <Routes>
                {/* Typing "localhost:3000/" on your browser will lead you to the Main component */}
                <Route path = "/" element ={<Main/>} />
            </Routes>
        </Router>
    )
}

export default RoutingTable