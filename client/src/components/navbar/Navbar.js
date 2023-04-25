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
   const handleProfile = () => {
   navigate("/profile");
   }

    const { user, logout } = useContext(AuthContext);
    const handleLogout = () => { logout();};


    return (
        <div className="navBar">
            <div className="navCon">
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                <p className="fw-bold mt-2" style={{fontSize: "30px"}}>Hotel Booking</p>
                </Link>
                {user ? (
                    <div className="navItems fw-bold">
                        {user.isVIP ? (
                            <div className="text-center pt-1" style={{fontSize: '20px'}}>
                                Welcome VIP user, {user.username}!
                            </div>

                        ) : (
                            <div className="text-center pt-1" style={{fontSize: '20px'}}>
                                Welcome, {user.username}!
                            </div>

                        )}
                        <button onClick={handleProfile} className="navButton">User Profile</button>
                        <button onClick={handleLogout} className="navButton">Logout</button>
                    </div>
                )  : (<div className="navItems">
                    <button onClick={handleProfile} className="navButton">User Profile</button>
                    <button onClick ={handleClickRegister} className="navButton">Register</button>
                    <button onClick={handleClick} className="navButton">Sign in</button>
                </div>
                )}
            </div>
        </div>

    )
}
export default List;