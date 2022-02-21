import React,{useState} from "react"
import "../styles/ImageSelector.css"

const ImageSelector = (props) => {
    const [picURL,setPicURL] = useState("https://res.cloudinary.com/purduecircle/image/upload/v1645303955/default_neaaeo.png")
    const [selectedFile, setSelectedFile] = useState(null)
    const fileSelectedHandler = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2){
                setPicURL(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
        setSelectedFile(e.target.files[0])
    }

    const fileUploadHandler = e => {
        e.preventDefault();
        if (!selectedFile){
            alert("Please select a file first")
            return
        }
        let fd = new FormData()
        fd.append("image",selectedFile)
        fetch("/api/user/upload",{
            method:"PATCH",
            body: fd
        })
        .then(response=>response.json())
        .then(response=> {if (response.uploaded){
            alert("Profile picture updated successfully")
        }})
    }

    return(
        <div className="image-selector-component">
            <div className="image-selector-div">
                <img src={picURL} alt="Profile pic"></img>
            </div>
            <input className = "image-selector-uploader" type="file" onChange={fileSelectedHandler} />
            <button onClick={fileUploadHandler}>Upload</button>
        </div>
    )
}
export default ImageSelector