const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
let studentRouter = require('./routes/student.route')
app.use(bodyParser.urlencoded({extended:true}))
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use('/student',studentRouter)




let port = process.env.PORT





app.listen(port,()=>{
    console.log(`app listening at port ${port}`);
})