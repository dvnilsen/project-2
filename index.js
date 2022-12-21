// require
require("dotenv").config()
const express = require("express")

// app config
const app = express()
const PORT = process.env.PORT || 8000 // pulling actual port on deployment, but use "|| port#" for testing 
app.set("view egine", "ejs") 
// parse request bodies from html forms
app.use(express.urlencoded( {extended: false })) // if we don't do this, req.body will be blank 

// routers and controllers
app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.use("/users", require("./controllers/users")) // using new.ejs, login.ejs, etc 

// listen
app.listen(PORT, () => {
    console.log(`You're listening to smooth jazz ${PORT}`)
})