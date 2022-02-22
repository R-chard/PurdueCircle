import React from "react"
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom" 
import "../styles/Profile.css"
import { Button } from "@material-ui/core"
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"

const Profile = () => {
    const history = useHistory()
    redirectIfNotAuth(history)

    console.log("profile");
    
    return (
        <div className={'profile'}>
            <Link to='/profile/settings' className="link">Settings</Link>
            <h1>Profile</h1>
            
            <div style={{maxWidth:"900px",margin:"0px auto"}}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    borderBottom:"1px solid grey"
                }}>
                    <h2>Username</h2>
                    {/* Profile Picture */}
                    <div>
                        <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5cdc8468-88cf-4472-9d66-44c7d166408e/de7hzn7-35d8732c-6522-40c5-8388-68940198cc8d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVjZGM4NDY4LTg4Y2YtNDQ3Mi05ZDY2LTQ0YzdkMTY2NDA4ZVwvZGU3aHpuNy0zNWQ4NzMyYy02NTIyLTQwYzUtODM4OC02ODk0MDE5OGNjOGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.SzAxp5Gzy5KOTOjcacaCJeg9-hTfBiOpRct5lF5jY5M"
                        />
                    </div>
                    {/* Right Side Info */}
                    <div>
                        <h2>FirstName LastName</h2>
                        <div style={{display:"flex",justifyContent:"space-between",width:"130%"}}>
                            <h6>40 posts</h6>
                            <Link to='/profile/followers' className="link">40 followers</Link>
                            <Link to='/profile/following' className="link">40 following</Link>
                            <Link to='/profile/topics' className="link">40 topics</Link>
                        </div>
                    </div>
                </div>

                <div className="timeline">
                    <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                    <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                    <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                    <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                    <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                    <img className="post" src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2012/06/wallpaper.png"/>
                </div>
            </div>
        </div>
    )
}

export default Profile