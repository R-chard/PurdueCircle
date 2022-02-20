const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/user-routes")
const path = require("path")

require("dotenv").config()

const app = express()

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.use(cors())
app.use(bodyParser.json())

// PLACE ANY ENDPOINT YOU WANT TO DIRECT BELOW
app.use("/api/user",userRoutes)

app.listen(process.env.PORT || 3001, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

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