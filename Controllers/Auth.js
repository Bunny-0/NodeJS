const express=require('express');

const {cleanUpAndValidate}=require('../Utils/Auth');

const User=require('../Models/User');

const authRouter=express.Router();

authRouter.post('/login',(req,res)=>{

})
authRouter.post('/register',async(req,res)=>{

    const {username,email,name,password,phone}=req.body;
    
    cleanUpAndValidate({username,email,name,password,phone}).then(async()=>{
        try{

            await User.verifyUsernameAndEmailExists({username,email});
    
        }
        catch(err){
            return res.send({
                status:401,
                message:err
            })
        }
        const user=new User({name,password,username,email,phone});

    try{
        const dbUser=await user.registerUser();

        return res.send({
            status:200,
            message:"Registration Successfully",
            data:dbUser
        })
    }
    catch(err){
        return res.send({
            status:402,
            message:"Database error. please try again",
            err:err
        })
    }
    })
    .catch(err=>{
        return res.send({     
            status:403,
            message:err,
            data:"inside catch block of Auth Controller"
        })
    });

    

    //save user in db
    //verify if it is an existing user.

  
    
    
})

module.exports=authRouter;