import React from 'react'
import axios from "axios"

import Divider from "@material-ui/core/Divider";
import { useHistory } from 'react-router-dom';

import '../styles/SettingsPopup.css'

const SettingsPopup = (props) => {
    const { setShowPopup }  = props
    const history = useHistory()

    const logout = () => {
      axios.delete("/api/user/logout",{
        withCredentials: true, credentials:"include"
      }).then(response => {
        console.log(response)
          if (response.data.success) {
              setShowPopup(false)
              history.push('/login')
          }
      }) 
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

export default SettingsPopup