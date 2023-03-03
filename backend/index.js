const connectToMongo = require("./db")
const express = require('express')
connectToMongo();

var cors = require('cors') //conect to front end 
const app = express()

const port = 5000

app.use(cors())
app.use(express.json());  // it basicaly allow me to get request in jason
app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))
// app.use("/api/notes").require("./routes/notes")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

