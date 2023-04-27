import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReserveComponent= ({ setOpen, hotelId, hotelName, kingRooms, queenRooms, startDate, endDate, handleStartDateChange, handleEndDateChange,
                         decrementQueenRooms, decrementKingRooms, incrementKingRooms, incrementQueenRooms, handleClick}) => {
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