const studentModel = require('../models/student.model')
const jwt = require('jsonwebtoken')
const cloudinary = (require('cloudinary'))
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


 
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
                    const expiresInMinutes = 30;
                    const expirationTimeInSeconds = expiresInMinutes * 60;
                    let token = jwt.sign({email},secret,{expiresIn: expirationTimeInSeconds })
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
const upload = (req,res) => {
    let myImage= req.body.image;
    cloudinary.v2.uploader.upload(myImage,(err,result)=>{
        if(err){
            console.log('file could not be uploaded');
            console.log(err);
        }else {
            let firstImage = result.secure_url;
            res.send({message:'image uploaded successfully',status:true, firstImage})
        }
    })

}



module.exports = {signUp,signIn,portal,upload}