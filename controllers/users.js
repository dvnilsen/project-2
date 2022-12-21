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

//export the router
module.exports = router