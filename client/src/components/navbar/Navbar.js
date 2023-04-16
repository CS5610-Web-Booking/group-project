import"./navbar.css"
import React from 'react';

const List = () => {
    return (
        <div className="navbar">
            <div className="navCon">
                <h2 className="logo">Trip Booking</h2>
                <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Sign in</button>
                </div>
            </div>
        </div>

    )
}
export default List;