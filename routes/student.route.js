const express = require('express')
const router = express.Router()
const {signUp,signIn,portal,upload,sendEmail,helpStudents} = require("../Controllers/student.controller")

router.post('/signup',signUp)
router.post('/signin',signIn)
router.get('/portal',portal)
router.post('/image',upload)
router.get('/sendemail',sendEmail)
router.post('/help',helpStudents)


module.exports = router