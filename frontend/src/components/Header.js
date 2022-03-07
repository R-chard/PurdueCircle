import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Button from '../components/Button'
import SettingsPopup from './SettingsPopup'

import '../styles/Header.css'

const Header = (props) => {
    const { userScheme, setUserScheme } = props

    const [showPopup, setShowPopup] = useState(false)
    let showCreatePostButton = true
    
    const page = useLocation()

    if (page.pathname === '/create') {
        showCreatePostButton = false
    }

    const toggleLogout = () => {
        setShowPopup(showPopup ? false : true)
    }

    return (
        <div className='contents mainHeader'>
            <Button className='button primary headerButton' pathTo='/' text='Home'/>
            <Button className='button headerButton' pathTo='/profile' text='Profile'/>
            {showCreatePostButton ? <Button className='button primary headerButton' pathTo='/create' text='New Post' /> : ''}
            <Button className='button primary headerButton settings' onClick={toggleLogout} text='Settings'/>
            {showPopup ? <SettingsPopup setShowPopup={setShowPopup} userScheme={userScheme} setUserScheme={setUserScheme}/> : ''}
        </div>
    )
}

export default Header