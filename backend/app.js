const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/user-routes")

require("dotenv").config()

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

// PLACE ANY ENDPOINT YOU WANT TO DIRECT BELOW
app.use("/api/user",userRoutes)

// Indicate to the developer that the server is working. Doesn't really do much
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/",()=>{
  const err = new Error("Route not found")
  err.status = 404
  throw err
})

// Error handling
app.use((err,req,res,next)=>{
  const status = err.statusCode || 500
  const message = err.message
  res.status(status).json({message})
})

// Establish connection with database
mongoose.connect(process.env.DB_KEY, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  },
  () => {
    var status = mongoose.connection.readyState == 1 ? "connected" : "disconnected"
    console.log("Database is " + status)
  }
);