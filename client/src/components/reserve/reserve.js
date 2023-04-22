import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


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
                        <p className="fw-bolder">King Room</p>
                        <p className="">One king-sized bed</p>
                    </div>
                    <div className="d-flex flex-wrap small text-secondary me-8" style={{gap: '5px'}}>
                        <button onClick={decrementKingRooms}>-</button>
                        <span className="mt-1">{kingRooms}</span>
                        <button onClick={incrementKingRooms}>+</button>
                    </div>

                </div>

                <div className="d-flex align-items-center p-4" style={{ gap: '50px' }}>
                    <div className="d-flex flex-column gap-2">
                        <p className="fw-bolder">Queen Room</p>
                        <p className="">Two queen-sized bed</p>
                    </div>
                    <div className="d-flex flex-wrap small text-secondary me-8" style={{ gap: '5px' }}>
                        <button onClick={decrementQueenRooms}>-</button>
                        <span className="mt-1">{queenRooms}</span>
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