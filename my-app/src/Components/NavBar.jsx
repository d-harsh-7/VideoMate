import "./style.css";

import { useNavigate } from "react-router-dom";
function NavBar(){
    const navigate=useNavigate()
    const handleRedirect=(e)=>{
        e.preventDefault()
        navigate("/")

    }

    return (
        <nav className="navbar">
            <div className="logo">
                <span className="logo-icon">🎥</span> <span>VideoMate</span>
            </div>

            <ul className="nav-links">
                <li>Detect AI Video</li>
                <li>How It Works</li>
            </ul>

            <div className="nav-actions">
                <a href="#">UserName</a>
                <a href="#" onClick={handleRedirect}>Logout</a>
            </div>
        </nav>
    )

}
export default NavBar