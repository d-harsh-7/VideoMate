const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const SignupRouter=require("./Routes/Signup")
const SigninRouter=require("./Routes/Signin")
const app=express()

const Mongourl="mongodb+srv://harshdubey3192_db_user:Saksham%401@cluster0.lia51mb.mongodb.net/?appName=Cluster0"
mongoose.connect(Mongourl)
    .then(()=>console.log("Connected to database"))
    .catch((err)=>console.log("MongoDB connection error:", err.message))

app.use(cors())
app.use(express.json())

//now i want to create a space for authentication and authorization...
app.get("/health",(req,res)=>{
    res.send({message:"Ok"})
})

app.get("/test/api",(req,res)=>{
    res.send({message:"Backend is Working"})
})
app.use("/signup",SignupRouter)

app.use("/signin",SigninRouter)

app.listen(3000,(req,res)=>{
    console.log("Running on port number 3000")
})
