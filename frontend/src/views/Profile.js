import React from "react"
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom" 

const Profile = () => {
    console.log("profile");
    return (
        <div>
            <h1>Profile</h1>
            <Link to='/settings' className="link">Settings</Link>
        </div>
    )
}

export default Profile