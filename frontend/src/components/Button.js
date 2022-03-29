import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Field from './Field'

import '../styles/Button.css'

/*
 * Description: This component provides for 4 designs of buttons (a gray 'Button', 'BlueButton', 'ButtonLink', and 'ButtonTwoColor'), 
 * each with 3 types ('regular', 'link', and 'formSubmit')
 * 
 * All styles are found in Button.css and follows 3 formats, basic text link, 'primary' (blue), and 'secondary' (gray)
 * 
 * Usage: 
 * Each component refers to a different style of button. Inside each component, the 'type' specifies what kind of button it is
 * 
 * For all buttons, input a type to specify the use (link, formSubmit, or leave empty for a regular button)
 * For formSubmit and regular buttons, pass an 'onClick' handler and 'text' to display
 * For links, pass a 'pathTo' for the destination link and 'text'
 */

const ButtonTemplate = (props) => {
    const {onClick, pathTo} = props
    let className = props.className
    // let text = props.text
    let { text, type } = props

    if (text === undefined)
        text = 'DEFAULT BUTTON TEXT'
    
    if (className === undefined)
        className = 'button'

    //types: fieldSubmit, regular, link
    if (type === undefined) {
        type = 'regular'
    }

    if (text === undefined) {
        text = 'DEFAULT BUTTON TEXT'
    }

    if (type === 'link') {
        //a link requires there to be a pathTo to change the Route
        return <RouterLink className={className} to={pathTo}>{text}</RouterLink>
    } else if (type === 'formSubmit') {
        //form submission requires type to be 'submit'
        return <Field className={`${className} formSubmit`} type={'submit'} value={text}/>
    } else {
        //anything else, className defines format of button
        return <button className={className} onClick={onClick}>{text}</button>
    }
} //Button


const ButtonBlue = (props) => {
    const { pathTo, onClick } = props
    let { type, className, text } = props

    if (className === undefined) {
        className = 'button primary'
    } else {
        className += ' button primary'
    }

    return <ButtonTemplate pathTo={pathTo} onClick={onClick} type={type} className={className} text={text}/>
} //PrimaryButton


const Button = (props) => {
    const { pathTo, onClick } = props
    let { type, className, text } = props

    if (className === undefined) {
        className = 'button secondary'
    } else {
        className += ' button secondary'
    }

    return <ButtonTemplate pathTo={pathTo} onClick={onClick} type={type} className={className} text={text}/>
} //PrimaryButton

const ButtonTwoColor = (props) => {
    const { pathTo, onClick } = props
    let { type, className, text } = props

    if (className === undefined) {
        className = 'button secondary'
    } else {
        className += ' button'
    }

    return <ButtonTemplate pathTo={pathTo} onClick={onClick} type={type} className={className} text={text}/>
} //PrimaryButton


const ButtonLink = (props) => {
    const { pathTo, onClick } = props
    let { className, text } = props

    const type = 'link'

    if (className === undefined) {
        className = 'button link'
    } else {
        className += ' button link'
    }

    return <ButtonTemplate pathTo={pathTo} onClick={onClick} type={type} className={className} text={text}/>
} //PrimaryButton

export { ButtonBlue, Button, ButtonTwoColor, ButtonLink }

export default Button
