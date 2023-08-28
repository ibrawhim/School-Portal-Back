const express = require('express')
const router = express.Router()
const {signUp,signIn,portal} = require("../Controllers/student.controller")

router.post('/signup',signUp)
// router.get('/signin',signIn)
router.post('/signin',signIn)
router.get('/portal',portal)


module.exports = router