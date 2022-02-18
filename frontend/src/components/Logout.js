import React from 'react'
// import { Link } from 'react-router-dom'
import '../styles/Logout.css'

import Divider from "@material-ui/core/Divider";

const Logout = (props) => {
    const { setUser, setShowLogout, history }  = props
    const logout = () => {
        setUser(false)
        setShowLogout(false)
    }

    const openProfile = () => {
      setShowLogout(false)
      history.push('/profile')
    }

  return (
      <div className='popup'>
        <h3>INSERT USERNAME</h3>
        {/* <div className='button'><Link className='link' to='/profile'>User Settings</Link></div> */}
        <button className='button' onClick={openProfile}>User Settings</button>
        <button className='button' onClick={logout}>Log out</button> 
        <div className='divider'>
          <Divider />
        </div>
        <button className='button' onClick={() => setShowLogout(false)}>Cancel</button>
      </div>
  )
}

export default Logout