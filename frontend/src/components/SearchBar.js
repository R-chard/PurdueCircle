import axios from "axios"
import React,{useState} from "react"
import AsyncSelect from "react-select/async"
import { useHistory } from "react-router-dom"

const SearchBar = () => {
    const [query,setQuery] = useState("")
    const history = useHistory()

    const handleChange = selected => {
        history.push(selected.value)
    }

    const loadOptions = (input) => {
        return axios.get("/api/topic/search/"+input)
        .then(response=>{
            const labels = []
            for(const result of response.data.results){
                if (result.username){
                    labels.push({label:"User: " + result.username,value:"profile/"+result.username})
                } else{
                    labels.push({label:"Topic: "+ result.title,value:"topic"})
                }
            }
            return labels
        })
    }

    return(<AsyncSelect 
        onInputChange={value=>setQuery(value)} 
        loadOptions={loadOptions} 
        onChange={handleChange} 
        placeholder="Search for a user/topic ..."
        noOptionsMessage={() => "No users or topics found"}
        />)
}

export default SearchBar