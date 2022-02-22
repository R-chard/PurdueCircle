import {useHistory} from "react-router-dom"

const RedirectIfNotAuth = () => {
    const history = useHistory()
    fetch("http://localhost:3001/api/user/validate")
        .then(function(response){
            if (response.status == 403){
                history.push("/login")
            }
        })
}

export default RedirectIfNotAuth