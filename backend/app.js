const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

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