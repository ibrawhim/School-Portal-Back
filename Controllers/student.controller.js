const studentModel = require('../models/student.model')
const jwt = require('jsonwebtoken')


const signUp = (req,res) => {
    console.log(req.body);
    let info = req.body
    let form = studentModel(info)
    form.save()
    .then((result)=>{
        console.log(result);
        // let myName = (result.lastname)
        res.send({status:true, message:'Sign Up Completed', result})
    })
    .catch((error)=>{
        console.log(error);
    })
}
const signIn = (req,res) => {
    let secret = process.env.SECRET
    let {email,password} = req.body
    studentModel.findOne({email: email})
    .then((response)=>{
        if(!response){
            res.send({status:false,message:'Wrong Credentials'})
        }else {
            response.validatePassword(password,(err,same)=>{
                if(!same){
                    res.send({status:false,message:'Wrong Credentials'})
                }else {
                    let token = jwt.sign({email},secret,{expiresIn: "7h"})
                    // console.log(token);
                    res.send({status:true, message:'Sign In Successful',token})
                }
            })
           
        }
        
    })
    .catch((error)=>{
        console.log(error);
    })
}
const portal = (req,res)=>{
    let token = req.headers.authorization.split(" ")[1]
    let secret = process.env.SECRET
    jwt.verify(token,secret,(err,result)=>{
        if(err){
            console.log(err);
            res.send({status: false, err})
        }else {
            studentModel.findOne({email: result.email})
            .then((response)=>{
                console.log(response);
                res.send({status: true,message:'welcome to dashboard' ,response})
            })
            .catch((error)=>{console.log(error);})
            // console.log(result);
        }
    })
    
}

module.exports = {signUp,signIn,portal}