const express=require("express")
const app=express();
const SigninRouter=express.Router()
const {handleUserSignin}=require("../Controller/UserController")


//now one route we user we get the page...
SigninRouter.post("/",handleUserSignin)

module.exports=SigninRouter