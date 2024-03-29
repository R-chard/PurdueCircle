import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"

import { useHistory } from 'react-router-dom';

import '../styles/SettingsPopup.css'

const SettingsPopup = (props) => {
    const { setShowPopup }  = props
    const history = useHistory()

    const logout = () => {
        axios.delete("/api/auth/logout",{
            withCredentials: true, credentials:"include"
        }).then(response => {
            if (response.data.success) {
                setShowPopup(false)
                history.push('/login')
            }
        }) 
    }

    const openProfile = () => {
        setShowPopup(false)
        history.push('/settings')
    }

    //hides popup when clicked outside
    function useOutsideAlerter(ref) {
        useEffect(() => {
            //alerts if clicked outside element except when clicking settings button (button toggles showPopup on its own)
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target) && !event.target.className.includes("headerButton settings")) {
                    setShowPopup(false)
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    } //useOutsidealerter()

    const popupRef = useRef(null)
    useOutsideAlerter(popupRef)

    const [userScheme, setUserScheme] = useState(document.body.classList[0])

    useEffect(() => {
        let colorScheme = document.body.classList[0]
        document.body.classList.remove(colorScheme)

        colorScheme = userScheme
        document.body.classList.add(colorScheme)
        
    }, [userScheme])

    const isSelected = (name) => {
        if (userScheme === name) {
            return 'selected'
        } else {
            return ''
        }
    }

    return (
        <div className='popup cornerMenu' ref={popupRef}>
            <div className='colorSchemeButtons'>
                <button className={`button ${isSelected('colorDark')}`} onClick={() => setUserScheme('colorDark')} data-testid="dark-button">Dark</button>
                <button className={`button ${isSelected('colorAuto')}`} onClick={() => setUserScheme('colorAuto')} data-testid="auto-button">Auto</button>
                <button className={`button ${isSelected('colorLight')}`} onClick={() => setUserScheme('colorLight')} data-testid="light-button">Light</button>
            </div>
            <div className='divider'>
                <hr />
            </div>
            <button className='button' onClick={openProfile}>User Settings</button>
            <button className='button' onClick={logout}>Log out</button> 
            <div className='divider'>
                <hr />
            </div>
            <button className='button cancel' onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
    )
} //SettingsPopup

export default SettingsPopup