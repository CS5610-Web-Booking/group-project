import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import { useContext, useState } from "react";
// import axios from "axios";

import "./reserve.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
// import {SearchContext} from "../../context/SearchContext";
// import useFetch from "../../hooks/useFetch";

const ReserveComponent= ({ setOpen }) => {
    const navigate = useNavigate();

    const [kingRooms, setKingRooms] = useState(0);
    const [queenRooms, setQueenRooms] = useState(0);

    const decrementKingRooms = () => {
        setKingRooms((prevKingRooms) => prevKingRooms - 1);
    };

    const incrementKingRooms = () => {
        setKingRooms((prevKingRooms) => prevKingRooms + 1);
    };

    const decrementQueenRooms = () => {
        setQueenRooms((prevQueenRooms) => prevQueenRooms - 1);
    };

    const incrementQueenRooms = () => {
        setQueenRooms((prevQueenRooms) => prevQueenRooms + 1);
    };

    const handleClick = () => {
        window.alert(`Your reservation for ${kingRooms} King Rooms, ${queenRooms} Queen Rooms is successful!`);
        setOpen(false);
        navigate("/");
    };

    return (
        <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center top-0 start-0" style={{ position: 'fixed' }}>
            <div className="bg-white p-4" style={{ position: 'relative' }}>
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="cursor position-absolute top-0 end-0"
                    onClick={() => setOpen(false)}
                />
                <span className="fw-bold mb-3">Select your rooms:</span>

                <div className="d-flex align-items-center p-4" style={{ gap: '50px' }}>
                    <div className="d-flex flex-column gap-2">
                        <div className="fw-bolder">King Room</div>
                        <div className="fw-bold">One king-sized bed</div>
                    </div>
                    <div className="d-flex flex-wrap small" style={{gap: '5px'}}>
                        <button onClick={decrementKingRooms}>-</button>
                        <span>{kingRooms}</span>
                        <button onClick={incrementKingRooms}>+</button>
                    </div>

                </div>

                <div className="d-flex align-items-center p-4" style={{ gap: '50px' }}>
                    <div className="d-flex flex-column gap-2">
                        <div className="fw-bolder">Queen Room</div>
                        <div className="fw-bold">Two queen-sized bed</div>
                    </div>
                    <div className="d-flex flex-wrap small text-secondary" style={{ gap: '5px' }}>
                        <button onClick={decrementQueenRooms}>-</button>
                        <span>{queenRooms}</span>
                        <button onClick={incrementQueenRooms}>+</button>
                    </div>
                </div>

                <button onClick={handleClick} className="w-100 btn btn-primary btn-lg btn-block mt-3 fw-bold cursor rButton">
                    Reserve Now
                </button>
            </div>
        </div>
    );
};

export default ReserveComponent;