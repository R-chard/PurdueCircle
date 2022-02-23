import React, {useEffect,useState} from 'react'
import axios from "axios"
import ImageSelector from "../components/ImageSelector"
import Field from '../components/Field';
import Button from "../components/Button"
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"
import { useHistory } from "react-router-dom";

const ProfileSettings = (props) => {
	const history = useHistory()
    redirectIfNotAuth(history)
    const [data, setData] = useState(null)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [phone, setPhone] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)

    const [usernameError, setUsernameError] = useState('')
    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [bioError, setBioError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    
    useEffect(()=>{
      axios.get("http://localhost:3001/api/user/getProfile",{
          withCredentials: true, credentials:"include"
      })
      .then(response=>{
          setData(response.data.currUser)
          setUsername(response.data.currUser.username)
          setEmail(response.data.currUser.email)
          setName(response.data.currUser.name)
      })
    },[])

    const bioHandler = (e) => {
      setBio(e.target.value)
    }
    const phoneHandler = (e) => {
      setPhone(e.target.value)
    }
    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const nameHandler = (e) => {
      setName(e.target.value)
      if(e.target.value == '') {
        setNameError(" - Please enter a name")
      } else {
        setNameError('')
      }
  }

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
      {data && (<div>
        <h1>ProfileSettings</h1>
        <h2>Profile</h2>
        <div style={{
          display:"flex",
          justifyContent:"space-around",
          margin:"18px 0px",
        }}>
          <ImageSelector profPic={data.profile_img}/>
          <div>
            <label htmlFor="name">Name</label>
            <label htmlFor="name" style={{color:'red'}}>{nameError}</label>
            <Field id="name" value={name} onChange={nameHandler} placeholder={'Edit Name'}/>
            <label htmlFor="bio">Bio</label>
            <Field id="bio" value={bio} onChange={bioHandler} placeholder={'Edit Bio'}/>
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
          <Field id="email" value={email} onChange={emailHandler} placeholder={'Edit Email'}/>
          <label htmlFor="phone">Phone Number</label>
          <Field id="phone" value={phone} onChange={phoneHandler} placeholder={'Edit Phone Number'}/>
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