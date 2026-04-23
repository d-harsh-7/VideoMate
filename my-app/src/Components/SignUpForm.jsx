import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm(){
    const navigate = useNavigate();
    const [formData,setFormData]=useState({name:"",email:"",password:""})
    const [message,setMsg]=useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRedirect = async (e) => {
        e.preventDefault();
        try{
            const response=await fetch("https://videomate-gumn.onrender.com/signup",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setMsg(data.message || "Request completed");

            if (response.ok) {
                navigate("/home");
            }
            else if(response.status==409){
                setMsg("User with same mail already exist");
            }
        }
        catch (error) {
            setMsg("Unable to connect to server");
        }

    };

    return (
    <div className="authFormWrap">
        <form id="signup-form" className="authForm" onSubmit={handleRedirect}>
            <h2>Create account</h2>
            <p>Start organizing your watchlist in seconds.</p>

            <label htmlFor="signup-name">Name</label>
            <input id="signup-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required/>

            <label htmlFor="signup-email">Email</label>
            <input id="signup-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required/>

            <label htmlFor="signup-password">Password</label>
            <input id="signup-password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a secure password" required/>

            <input type="submit" value="Create Account" className="auth-submit"/>
            <p>{message}</p>
        </form>
    </div>
    );
}
export default SignUpForm