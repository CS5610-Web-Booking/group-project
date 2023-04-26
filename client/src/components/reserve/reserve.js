import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./reserve.css";
import {SearchContext} from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

const ReserveComponent= ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    };

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: alldates,
                    });
                    return res.data;
                })
            );
            setOpen(false);
            navigate("/");
        } catch (err) {}
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
                {data.map((item) => (
                    <div className="d-flex align-items-center p-4" style={{ gap: '50px' }}key={item._id}>
                        <div className="d-flex flex-column gap-2">
                            <div className="fw-bolder">{item.title}</div>
                            <div className="fw-bold">{item.desc}</div>
                            <div className="font-size-12">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="fw-bolder">{item.price}</div>
                        </div>
                        <div className="d-flex flex-wrap small text-secondary" style={{ gap: '5px' }}>
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="d-flex flex-column">
                                    <label>
                                        {roomNumber.number}
                                        <input
                                            type="checkbox"
                                            value={roomNumber._id}
                                            onChange={handleSelect}
                                            disabled={!isAvailable(roomNumber)}
                                            className="ms-2"
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="w-100 btn btn-primary btn-lg btn-block mt-3 fw-bold cursor rButton">
                    Reserve Now
                </button>
            </div>
        </div>
    );
};

export default ReserveComponent;