// create an instance of express router
const express = require("express")
const db = require("../models")
const router = express.Router()

// mount routes on the router

// GET /users/new -- serves a form to create a new user
router.get("/new", (req, res) => {
    res.render("users/new.ejs")
})
// POST /users -- creates new user from form @ /users/new (above) 
router.post("/", async (req, res) => {
    try {
        //based on info in the req.body, find or create a user
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            // TODO: don't add plaintext passwords to the db
            defaults: req.body.password
        })
        // TODO: redirect to the login page if the user is found
        // log the user in (store user's id as a cookie in the browser)
        res.cookie("userId", newUser.id)
        // redirect to home page (for now)
        res.redirect("/") 

    } catch (err) {
        console.log(err)
        res.status(500).send("server error") 
    }
})

// GET /users/login -- render a login form that POSTs to /users/login
router.get("/login", (req, res) => {
    res.render("users/login.ejs") 
})

// POST /users/login -- ingest data from form rendered by above login GET
router.post("/login", async (req, res) => {
    try {
        // look up based on email
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        // boilerplate message if login fails
        const badCredentialMessage = "username or password incorrect"
        if (!user) {
            // if the user isn't found in db
            res.redirect("/users/login?message=", + badCredentialMessage)
        } else if (user.password !== req.body.password) {
            // if pw is incorrect
            res.redirect("/users/login?message=", + badCredentialMessage)
        } else {
            // if the user is found and their pw matches, log them in
            console.log("logging user in!")
            res.cookie("userId", user.id)
            res.redirect("/") 
        }
    } catch (err) {
        console.log(err) 
    }
})

// GET /users/logout -- clear cookies and redirect to home page
router.get("/logout", (req, res) => {
    res.send("log user out by clearing cookie") 
})

//export the router
module.exports = router