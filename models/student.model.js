const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
let URI = process.env.MONGO

mongoose.connect(URI).then(()=>{console.log('Mongoose is connected');}).catch((err)=>{console.log(err);})

let studentSchema = mongoose.Schema({
    dob: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    matric: {type: String, required: true}
})

let helpSchema = mongoose.Schema({
    subject: {type: String, required: true},
    help: {type: String, required: true},
    helpTime: {type: String, required: true},
    helpDate: {type: String, required: true},
})

let saltRound = 5
studentSchema.pre("save",function(next){
    bcrypt.hash(this.password,saltRound,(err,hashedPassword)=>{
        if(err){
            console.log(err);
        }else {
            console.log(hashedPassword);
            this.password = hashedPassword
            next()
        }
    })
})

studentSchema.methods.validatePassword = function(password,callback){
    bcrypt.compare(password,this.password,(err,same)=>{
        if(!err){
            callback(err,same)
        }else {
            next()
        }
    })
}
let studentModel = mongoose.model('Signup',studentSchema)
let helpModel = mongoose.model('help',helpSchema)




module.exports = {studentModel,helpModel}