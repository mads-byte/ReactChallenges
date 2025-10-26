import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">

                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} to="/">Home</NavLink></li>


                <li><NavLink className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')} to="/List">Task List</NavLink></li>

            </ul>
        </nav>
    )

}

export default Navbar