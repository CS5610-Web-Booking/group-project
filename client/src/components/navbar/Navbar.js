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
    const handleClickRegister = () => {
        navigate("/register");
    }
    const { user } = useContext(AuthContext);


   const { logout } = useContext(AuthContext);

   const handleLogout = () => { logout();};

    return (
        <div className="navbar">
            <div className="navCon">
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                <p className="font-weight-700;">Hotel Booking</p>
                </Link>
                {user ? (<><span>{user.username}<button onClick={handleLogout}>Logout</button></span></>) : (<div className="navItems">
                    <button onClick ={handleClickRegister} className="navButton">Register</button>
                    <button onClick={handleClick} className="navButton">Sign in</button>
                </div>
                )}
            </div>
        </div>

    )
}
export default List;