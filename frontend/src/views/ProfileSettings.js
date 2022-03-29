import React, {useEffect,useState} from 'react'
import axios from "axios"
import ImageSelector from "../components/ImageSelector"
import Field from '../components/Field';
import { ButtonBlue } from '../components/Button'
import { useHistory } from "react-router-dom";

import '../styles/ProfileSettings.css'
import ConfirmDialog from '../components/ConfirmDialog'

const ProfileSettings = (props) => {
	const history = useHistory()
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
    const [phoneError, setPhoneError] = useState('')

    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    
    useEffect(()=>{
      axios.get("/api/user/getUser",{
          withCredentials: true, credentials:"include"
      })
      .then(response=>{
          setData(response.data.currUser)
          setUsername(response.data.currUser.username)
          setEmail(response.data.currUser.email)
          setName(response.data.currUser.name)
          setBio(response.data.currUser.biography)
          setPhone(response.data.currUser.phone)
      })
    },[])

    const bioHandler = (e) => {
      setBio(e.target.value)
    }
    const phoneHandler = (e) => {
        setPhone(e.target.value)
        const regex = new RegExp(/\D+/);
        if(regex.test(e.target.value)) {
            setPhoneError(" - Should only contain numbers")
        } else if (e.target.value === '' ){
            setPhoneError('')
        } else if (e.target.value.length !== 10){
            setPhoneError(' - Phone number must be 10 digits')
        } else {
            setPhoneError('')
        }
    }
    const usernameHandler = (e) => {
        setUsername(e.target.value)
        if(e.target.value === '') {
          setUsernameError(" - Please enter a username")
        } else {
          setUsernameError('')
        }
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value === '') {
          setPasswordError('')
        } else if (e.target.value.length < 8) {
          setPasswordError(" - Password length must be at least 8 characters")
        } else {
          setPasswordError('')
        }
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)

        if(e.target.value === '') {
          setEmailError(" - Please enter an email")
        } else if (!(e.target.value.includes('@') && e.target.value.includes('.'))) {
          setEmailError(' - Invalid email format')
        } else {
          setEmailError('')
        }
    }
    const nameHandler = (e) => {
      setName(e.target.value)
      if(e.target.value === '') {
        setNameError(" - Please enter a name")
      } else {
        setNameError('')
      }
  }

  //TODO add submit handler & make button call it
  const checkError = () => {
        return (nameError === '' && phoneError === '' && usernameError === '' && passwordError === '' && emailError === '')
  }

  const mainDialogHandler = () => {
    axios.delete("/api/auth/delete",{
        withCredentials: true, credentials:"include"
      }).then(response => {
          if (response.data.success) {
              history.push('/signup')
              alert("account deleted")
          }
      })

      setShowConfirmDialog(false)
      history.push('/login')
  }

  const cancelDialogHandler = () => {
      setShowConfirmDialog(false)
  }

  const toggleShowDialog = e => {
    e.preventDefault()

    setShowConfirmDialog(true)
  }

  const dialogTitle = 'Are you sure you want to delete your account?'

  const apply = e => {
    e.preventDefault()
    //console.log(nameError=='' && phoneError=='')
    let updateObject = {}
    if (password.length === 0) {
      updateObject = {
        name,
        biography:bio,
        username,
        email,
        phone
      }
    } else {
      updateObject = {
        name,
        biography:bio,
        username,
        password,
        email,
        phone
      }
    }

    if(checkError()) {
      axios.patch("/api/user/update",updateObject,{
        withCredentials: true, credentials:"include"
      }).then(response => {
        if(response.data.success){
          alert("Changes successful")
        }
      })
    } else {
        console.log('check errors in fields');
    }
  }
  const cancel = e => {
    e.preventDefault()
        axios.get("/api/user/getUser",{
            withCredentials: true, credentials:"include"
        }).then(response => {
            if(response.data.currUser){
                history.push("/profile/" + response.data.currUser.username)
            }
        })
  }
  
  return (
    <div className='contents profileSettings'>
      {data && (<div>
        <h1>ProfileSettings</h1>
        <h2>Profile</h2>
        {showConfirmDialog ? <ConfirmDialog title={dialogTitle} buttonText='Delete Account' mainHandler={mainDialogHandler} cancelHandler={cancelDialogHandler}/> : ''}

        <div style={{
          display:"flex",
          justifyContent:"space-around",
          margin:"18px 0px",
        }}>
          <ImageSelector profPic={data.profile_img}/>
          <div>
            <label htmlFor="name">Name *</label>
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
          <label htmlFor="username">Username *</label>
          <label htmlFor="username" style={{color:'red'}}>{usernameError}</label>
          <Field id="username" value={username} onChange={usernameHandler}/>

          <label htmlFor="password">Password</label>
          <label htmlFor="password" style={{color:'red'}}>{passwordError}</label>
          <Field type='password' id="password" onChange={passwordHandler} placeholder={'Change Password'}/>
          
          <label htmlFor="email">Email Address *</label>
          <label htmlFor="email" style={{color:'red'}}>{emailError}</label>
          <Field id="email" value={email} onChange={emailHandler} placeholder={'Edit Email'}/>

          <label htmlFor="phone">Phone Number</label>
          <label htmlFor="phone" style={{color:'red'}}>{phoneError}</label>
          <Field id="phone" value={phone} onChange={phoneHandler} placeholder={'Edit Phone Number'}/>

          <div style={{display:"flex", justifyContent:"space-around"}}>
            <ButtonBlue onClick={toggleShowDialog} text={'Delete Account'}/>
            <ButtonBlue onClick={apply}  text={'Apply Changes'}/>
            <ButtonBlue onClick={cancel}  text={'Cancel'}/>
          </div>
        </div>
    </div>)}
    </div>
  )
}

export default ProfileSettings