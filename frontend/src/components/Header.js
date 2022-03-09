import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Button from '../components/Button'
import SettingsPopup from './SettingsPopup'

import '../styles/Header.css'

const Header = (props) => {

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
            <Button className='button primary headerButton i1' pathTo='/' text='Home'/>
            <Button className='button headerButton i2' pathTo='/profile' text='Profile'/>
            {showCreatePostButton ? <Button className='button primary headerButton i3' pathTo='/create' text='New Post' /> : ''}
            <Button className='button primary headerButton settings i4' onClick={toggleLogout} text='Settings'/>
            {showPopup ? <SettingsPopup setShowPopup={setShowPopup} /> : ''}
        </div>
    )
}

export default Header