import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div className="notfound-wrapper">
            <div className="notfound-card">
                <div className="notfound-code">404</div>
                <h1 className="notfound-title">Page Not Found</h1>
                <p className="notfound-msg">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <button className="notfound-btn" onClick={() => navigate("/")}>
                    Go Back Home
                </button>
            </div>
        </div>
    );
}

export default PageNotFound;