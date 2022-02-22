const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const userRoutes = require("./routes/user-routes")
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
require("dotenv").config()

const app = express()

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

const store = new MongoDBSession({
  uri: process.env.DB_KEY,
  collection: "mySessions"
})

app.use(cors())
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_KEY,
  resave:false,
  saveUninitialized:false,
  store
}))

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

