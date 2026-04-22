const express=require("express")

const SignupRouter=express.Router()
const {handleUserSignup}=require("../Controller/UserController")

SignupRouter.post('/',handleUserSignup);

module.exports=SignupRouter
