import React,{useState} from "react"

// COMPONENTS MUST ALWAYS BEGINS WITH CAP LETTERS
const Main = () => {
    // useState is a libary function from React.
    /* "data"/"username" is what I named the state in this case.
    When it's value changes, the page refreshes. If you do not
    use the useState function and just assign data/username to be variables
    changing their value would not cause their value to be updated until
    the page refreshes. We pretty much always use state if it contains a value
    you want to display on the UI*/

    /*setData/ setUsername is what you call to modify the state*/
    /*nothing yet and John is the initial value of the states */
    const [data,setData] = useState("nothing yet")
    const [username,setUserName] = useState("John")

    const onClickHandler = (e)=> {
        // by default when u click on a button it refreshes the page or does something stupid.
        // Generally i always call this to stop that
        e.preventDefault();

        let request = {
            username, // Same as username:username
            email:"j@gmail.com",
            password:"123"
        }
        setUserName(username + "1")
        // send data to backend. This request goes to the app.js file on the backend
        fetch("http://localhost:5000/api/user/signup",{
            method:"POST",
            // means the contents we are sending is in JSON
            headers:{
                "Content-Type":"application/json"
            },
            // converts request to json
            body:JSON.stringify(request)
        })
        // read up on then/async/await
        .then(response=>response.json())
        // set the response we received from the signUp function in user-controller on the backend
        .then(response=>{setData(response.signedIn)})
    }
    return (<div>
        <button onClick={onClickHandler}>Click Me</button>
        <p>Backend server's response is {data}</p>
    </div>)
}

// export so another page can import
export default Main;