import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";


const ReserveComponent= ({ setOpen, hotelId, hotelName }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [kingRooms, setKingRooms] = useState(0);
    const [queenRooms, setQueenRooms] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

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

    const handleClick = async () => {
        const userId = user._id;
        const reservation = {
            startDate,
            endDate,
            kingRooms,
            queenRooms,
            userId,
            hotelId,
            hotelName,
        };
        try {
            const response = await axios.post(`http://localhost:8800/api/reservation`, reservation);
            window.alert(`Your reservation is successful!`);
            setOpen(false);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center top-0 start-0" style={{ position: 'fixed' }}>
            <div className="bg-white p-4" style={{ position: 'relative' }}>
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="cursor position-absolute top-0 end-0"
                    onClick={() => setOpen(false)}
                />
                <div className="fw-bold mb-3" style={{fontSize: '22px'}}>Select your dates:</div>
                <div>
                    <span>Start Date:</span>
                    <DatePicker selected={startDate} onChange={handleStartDateChange} />
                </div>
                <div>
                    <label>End Date:</label>
                    <DatePicker selected={endDate} onChange={handleEndDateChange} />
                </div>

                <div className="fw-bold mt-5 mb-3" style={{fontSize: '22px'}}>Select your room:</div>

                <div className="d-flex align-items-center">
                    <div className="d-flex flex-column">
                        <div className="fw-bolder">King Room</div>
                        <div className="">One king-sized bed</div>
                    </div>
                    <div className="d-flex flex-wrap small text-secondary" style={{marginLeft:'100px'}}>
                        <button onClick={decrementKingRooms}>-</button>
                        <span className="ms-1 me-1 mt-1">{kingRooms}</span>
                        <button onClick={incrementKingRooms}>+</button>
                    </div>

                </div>

                <div className="d-flex align-items-center mt-2">
                    <div className="d-flex flex-column">
                        <div className="fw-bolder">Queen Room</div>
                        <div className="">Two queen-sized bed</div>
                    </div>
                    <div className="d-flex flex-wrap small text-secondary" style={{marginLeft:'87px'}}>
                        <button onClick={decrementQueenRooms}>-</button>
                        <span className="ms-1 me-1 mt-1">{queenRooms}</span>
                        <button onClick={incrementQueenRooms}>+</button>
                    </div>
                </div>

                <button onClick={handleClick} className="w-100 btn btn-primary btn-lg btn-block mt-5 fw-bold cursor rButton">
                    Reserve Now
                </button>
            </div>
        </div>
    );
};

export default ReserveComponent;