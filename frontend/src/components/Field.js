import React from 'react'

import '../styles/Field.css'

/*
 * The props are as follows
 * type: defines type of field (used to make password hide characters)
 * value: value that is displayed inside field & will be submitted
 * onChange: handler for changing value that is displayed
 * placeHolder: placeholder background text when field is empty
 * className: used for allowing custom selectors in CSS for different uses (optional, used for extra/custom CSS)
 * 
 * Prop requirements
 * For a password field, all props (^ except clasName, same for rest)
 * For regular text field, all props except type
 * For form submission button, use Button component
 */

const Field = (props) => {
    const {id, type, value, onChange, placeholder} = props
    var className = props.className

    if (className === undefined)
        className = 'field'
    else
		className = 'field ' + className

    return (
    	<input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} className={className}/>
  	)
} //Field

export default Field