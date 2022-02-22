import React, {} from 'react'
import ImageSelector from "../components/ImageSelector"
import Field from '../components/Field';
import Button from "../components/Button"
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"
import { useState } from "react";

const ProfileSettings = (props) => {
  redirectIfNotAuth()
  const { submit, username, usernameHandler, password, passwordHandler} = props.inputFunctions

  /*
  const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }*/

    //TODO add submit handler & make button call it
  
  const deleteAccount = () => {
    console.log("deleteAccount")
  }

  const apply = () => {
    console.log("apply")
  }

  const cancel = () => {
    console.log("cancel")
  }

  return (
    <div>
        <h1>ProfileSettings</h1>
        <h2>Profile</h2>
        <div style={{
          display:"flex",
          justifyContent:"space-around",
          margin:"18px 0px",
        }}>
          <ImageSelector />
          <div>
            <label htmlFor="name">Name</label>
            <Field id="name" onChange={usernameHandler} placeholder={'Edit Name'}/>
            <label htmlFor="bio">Bio</label>
            <Field id="bio" onChange={usernameHandler} placeholder={'Edit Bio'}/>
          </div>
        </div>

        <h2>Account</h2>
        <div style={{
          display:"block",
          justifyContent:"space-around",
          margin:"18px 0px",
        }}>
          <label htmlFor="username">Username</label>
          <Field id="username" value={username} onChange={usernameHandler}/>
          <label htmlFor="password">Password</label>
          <Field id="password" onChange={passwordHandler} placeholder={'Change Password'}/>
          <label htmlFor="email">Email Address</label>
          <Field id="email" onChange={usernameHandler} placeholder={'Edit Email'}/>
          <label htmlFor="phone">Phone Number</label>
          <Field id="phone" onChange={usernameHandler} placeholder={'Edit Phone Number'}/>
          <div style={{display:"flex", justifyContent:"space-around"}}>
            <Button className='button primary' onClick={deleteAccount} text={'Delete Account'}/>
            <Button className='button primary' onClick={apply}  text={'Apply Changes'}/>
            <Button className='button primary' onClick={cancel}  text={'Cancel'}/>
          </div>
        </div>
    </div>
  )
}

export default ProfileSettings