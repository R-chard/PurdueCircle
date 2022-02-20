import React from 'react'
import '../styles/Field.css'

const Field = (props) => {
    const {type, value, onChange, placeholder} = props
    var className = props.className

    if (className === undefined)
        className = 'field'
    else
		className = 'field ' + className

    return (
    	<input type={type} value={value} onChange={onChange} placeholder={placeholder} className={className}/>
  	)
} //Field

export default Field