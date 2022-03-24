import React, { useState } from 'react'
import { useLocation,useHistory } from 'react-router-dom'

import Button from '../components/Button'
import SettingsPopup from './SettingsPopup'

import '../styles/Header.css'
import axios from 'axios'

const Header = (props) => {

    const [showPopup, setShowPopup] = useState(false)
    const history = useHistory()
    let showCreatePostButton = true
    
    const page = useLocation()

    if (page.pathname === '/create') {
        showCreatePostButton = false
    }

    const toggleLogout = () => {
        setShowPopup(showPopup ? false : true)
    }

    const profileHandler = e => {
        axios.get("/api/user/getUser",{
            withCredentials: true, credentials:"include"
        }).then(response => {
            if(response.data.currUser){
                history.push("/profile/" + response.data.currUser.username)
            }
        })
    }

    // useEffect(() => {
    //     console.log('%cheader effect','color:blue; font-weight: bold; font-size: 15px')
    
    //   return () => {
    //     console.log('%cheader cleanup','color:blue; font-weight: bold; font-size: 15px')
    //   }
    // }, [])
    

    return (
        <div className='contents mainHeader'>
            <Button className='button primary headerButton' pathTo='/' text='Home'/>
            <Button className='button headerButton' onClick={profileHandler} text='Profile'/>
            {showCreatePostButton ? <Button className='button primary headerButton' pathTo='/create' text='New Post' /> : ''}
            <Button className='button primary headerButton settings' onClick={toggleLogout} text='Settings'/>
            {showPopup ? <SettingsPopup setShowPopup={setShowPopup} /> : ''}
        </div>
    )
}

export default Header