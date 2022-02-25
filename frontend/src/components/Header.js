import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Button from '../components/Button'
import SettingsPopup from './SettingsPopup'

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

    // useEffect(() => {
    //     console.log('%cheader effect','color:blue; font-weight: bold; font-size: 15px')
    
    //   return () => {
    //     console.log('%cheader cleanup','color:blue; font-weight: bold; font-size: 15px')
    //   }
    // }, [])
    

    return (
        <div className='contents header'>
            <Button className='button primary headerButton' pathTo='/' text='Home'/>
            <Button className='button headerButton' pathTo='/profile' text='Profile'/>
            {showCreatePostButton ? <Button className='button primary headerButton' pathTo='/create' text='New Post' /> : ''}
            <Button className='button primary logout headerButton' onClick={toggleLogout} text='Settings'/>
            {showPopup ? <SettingsPopup setShowPopup={setShowPopup} /> : ''}
        </div>
    )
}

export default Header