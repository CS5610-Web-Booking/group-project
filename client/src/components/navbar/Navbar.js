import"./navbar.css"
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const List = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    }
    const { user } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="navCon">
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                <p className="font-weight-700;">Hotel Booking</p>
                </Link>
                {user ? user.username : (<div className="navItems">
                    <button className="navButton">Register</button>
                    <button onClick={handleClick} className="navButton">Sign in</button>
                </div>
                )}
            </div>
        </div>

    )
}
export default List;