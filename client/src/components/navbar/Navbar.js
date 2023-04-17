import"./navbar.css"
import React from 'react';
import { Link } from 'react-router-dom';

const List = () => {
    return (
        <div className="navbar">
            <div className="navCon">
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                <p className="font-weight-700;">Hotel Booking</p>
                </Link>
                <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Sign in</button>
                </div>
            </div>
        </div>

    )
}
export default List;