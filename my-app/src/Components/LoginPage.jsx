import React from "react";
import './style.css'
import { useState } from "react";
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"


function LoginPage(){
    const [Login,isLogin]=useState(true);
    
    return (
        <div className="container1">
            <div className="loginPhoto">
                <img src='../src/assets/LoginPage.avif' alt="login Photo" />
            </div>
            <div className="authPane">
                <div className="buttonContainer">
                    <button className={Login ? "activeTab" : ""} onClick={()=>isLogin(true)} >Login</button>
                    <button className={!Login ? "activeTab" : ""} onClick={()=>isLogin(false)}>SignUp</button>
                </div>
                {Login? <LoginForm/>:<SignUpForm/>}
                
            </div>
            
            

        </div>
        
    )
}

export default LoginPage