const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const userRoutes = require("./routes/user-routes")
const port = 3001

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// PLACE ANY ENDPOINT YOU WANT TO DIRECT BELOW
app.use("/api/user",userRoutes)

// Indicate to the developer that the server is working. Doesn't really do much
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Establish connection with database
mongoose.connect(
  "mongodb+srv://admin:P4rdue@cluster0.g5hjd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  },
  () => {
    var status = mongoose.connection.readyState == 1 ? "connected" : "disconnected"
    console.log("Database is " + status)
  }
);