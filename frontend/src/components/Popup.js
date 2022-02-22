import React from 'react'
import '../styles/Popup.css'

import Divider from "@material-ui/core/Divider";
import { useHistory } from 'react-router-dom';

const Logout = (props) => {
    const { setShowPopup }  = props
    const history = useHistory()

    const logout = () => {
        //TODO replace with remove cookie?
        history.push('/login')

        setShowPopup(false)
    }

    const openProfile = () => {
      setShowPopup(false)
      history.push('/profile/settings')
    }

  return (
      <div className='popup cornerMenu'>
        <h3>INSERT USERNAME</h3>
        <div className='divider'>
          <Divider />
        </div>
        <button className='button' onClick={openProfile}>User Settings</button>
        <button className='button' onClick={logout}>Log out</button> 
        <div className='divider'>
          <Divider />
        </div>
        <button className='button cancel' onClick={() => setShowPopup(false)}>Cancel</button>
      </div>
  )
}

export default Logout