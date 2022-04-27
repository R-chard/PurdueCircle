import React,{useEffect} from "react"

const Theme = () =>{
    useEffect(() => {
        document.body.classList.add('colorAuto')
    }, [])
    return<div></div>
}

export default(Theme)
