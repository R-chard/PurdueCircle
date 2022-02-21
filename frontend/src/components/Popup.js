import React from 'react'
import '../styles/Popup.css'

import Divider from "@material-ui/core/Divider";

const Logout = (props) => {
    const { setUser, setShowLogout, history }  = props
    const logout = () => {
        setUser(false)
        setShowLogout(false)
    }

    const openProfile = () => {
      setShowLogout(false)
      history.push('/profile/settings')
    }

  return (
      <div className='popup cornerMenu'>
        <h3>INSERT USERNAME</h3>
        <div className='divider'>
          <Divider />
        </div>
        {/* <div className='button'><Link className='link' to='/profile'>User Settings</Link></div> */}
        <button className='button' onClick={openProfile}>User Settings</button>
        <button className='button' onClick={logout}>Log out</button> 
        <div className='divider'>
          <Divider />
        </div>
        <button className='button cancel' onClick={() => setShowLogout(false)}>Cancel</button>
      </div>
  )
}

export default Logout