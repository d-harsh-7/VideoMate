import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm(){
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRedirect = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/signin", {
                method: "POST",
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
            else if(response.status==404){
                setMsg("User Not Found")
            }
        } catch (error) {
            setMsg("Unable to connect to server");
        }
    };

    return (
        <div className="authFormWrap">
            <form id="signin-form" className="authForm" onSubmit={handleRedirect}>
                <h2>Welcome back</h2>
                <p>Sign in to continue your VideoMate journey.</p>

                <label htmlFor="signin-email">Email</label>
                <input id="signin-email" type="email" name="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange}/>

                <label htmlFor="signin-password">Password</label>
                <input id="signin-password" type="password" name="password" placeholder="Enter your password" required value={formData.password} onChange={handleChange}/>

                <input type="submit" value="Sign In" className="auth-submit"/>
                {msg && <p>{msg}</p>}
            </form>
        </div>
    )
}
export default LoginForm