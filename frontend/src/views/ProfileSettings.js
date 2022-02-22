import ImageSelector from "../components/ImageSelector"
import Field from '../components/Field';
import Button from "../components/Button"
import redirectIfNotAuth from "../utils/redirectionIfNotAuth"
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ProfileSettings = (props) => {
	const history = useHistory()
    redirectIfNotAuth(history)

    console.log("settings");

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    //TODO add submit handler & make button call it

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
				<Field type={username} onChange={usernameHandler} placeholder={'Edit Name'}/>
				<Field type={username} onChange={usernameHandler} placeholder={'Edit Bio'}/>
			</div>
			</div>

			<h2>Account</h2>
			<div style={{
			display:"block",
			justifyContent:"space-around",
			margin:"18px 0px",
			}}>
			
			<Field type={username} onChange={usernameHandler} placeholder={'Edit Username'}/>
			<Field type={'password'} value={password} onChange={passwordHandler} placeholder={'Change Password'}/>
			<Field type={username} onChange={usernameHandler} placeholder={'Edit Email'}/>
			<Field type={username} onChange={usernameHandler} placeholder={'Edit Phone Number'}/>
			<div style={{display:"flex", justifyContent:"space-around"}}>
				<Button className={'link'} pathTo={'/signup'} text={'Delete Account'}/>
				<Button className={'link'} pathTo={'/signup'} text={'Apply Changes'}/>
				<Button className={'link'} pathTo={'/signup'} text={'Cancel'}/>
			</div>
			</div>
		</div>
	)
}

export default ProfileSettings