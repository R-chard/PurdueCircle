import React, {useEffect,useState} from 'react'
import axios from "axios"
import ImageSelector from "../components/ImageSelector"
import Field from '../components/Field';
import Button from "../components/Button"
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"
import { useHistory } from "react-router-dom";

import '../styles/ProfileSettings.css'

const ProfileSettings = (props) => {
	const history = useHistory()
    //redirectIfNotAuth(history)
    const [data, setData] = useState(null)
    useEffect(()=>{
      axios.get("/api/user/getProfile",{
          withCredentials: true, credentials:"include"
      })
      .then(response=>{
          setData(response.data.currUser)
      })
    },[])

  const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)

    const usernameHandler = (e) => {
        //setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    //TODO add submit handler & make button call it
  
  const deleteAccount = () => {
    axios.delete("/api/user/delete",{
      withCredentials: true, credentials:"include"
    }).then(response => {
        if (response.data.isValid) {
            history.push('/login')
            alert("account deleted")
        }
    }) 
  }

  const apply = () => {
    console.log("apply")
  }

  const cancel = () => {
    console.log("cancel")
  }

  return (
    <div className='contents profileSettings'>
      {data && (<div>
        <h1>ProfileSettings</h1>
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
          <Field id="username" value={data.username} onChange={usernameHandler}/>
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
    </div>)}
    </div>
  )
}

export default ProfileSettings