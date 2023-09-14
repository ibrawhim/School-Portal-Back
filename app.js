const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
require('dotenv').config()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true,limit:'50mb'}))


app.use(express.json({limit:'50mb'}))
let studentRouter = require('./routes/student.route')
app.use('/student',studentRouter)




let port = process.env.PORT


// app.get("/", (req,res)=>{
//     res.send("hello world")
// })


let connection = app.listen(port,()=>{
    console.log(`app listening at port ${port}`)
})
let socketClient = require('socket.io')
let io = socketClient(connection,{
    cors :{origin: "*"}
})
io.on("connection",(socket)=>{
    console.log(socket.id);
    console.log("a user connected successfully");
    socket.on("sendMsg",(message)=>{
        console.log(message);
        io.emit("broadcastMsg",message )
    })
    socket.on("disconnect",()=>{
        console.log('someone disconnected')
    })
})