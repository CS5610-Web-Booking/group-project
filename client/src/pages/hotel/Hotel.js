import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SubscribeComponent from "../../components/subscribe/Subscribe";
import FooterComponent from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar, faLocationDot,} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ReserveComponent from "../../components/reserve/Reserve";
import axios from "axios";

const Hotel = () => {
    const location = useLocation();
    const path = location.pathname;
    const matches = path.match(/\d+$/);
    const id = parseInt(matches.pop());

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [kingRooms, setKingRooms] = useState(0);
    const [queenRooms, setQueenRooms] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const options = {
        method: 'GET',
        headers: {
             'X-RapidAPI-Key': '92749f1e5bmshe907383f6ca8192p127a3djsn38dd8aae4860',
             'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const response = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${id}&locale=en-us`, options);
            const result = await response.json();
            setData(result);
            setLoading(false);
        };
        fetchData();
    }, [id]);


    useEffect(() => {
        if (data.name) {
            setName(data.name);
        }
    }, [data]);

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");
        }
    };

    const handleGoBack = () => {
        navigate(-1); // navigate back to previous page
    };

    const handleCloseModal = () => {
        setKingRooms(0);
        setQueenRooms(0);
        setStartDate(null);
        setEndDate(null);
        setOpenModal(false);
        navigate("/")
    };

    const handleReserveClick = async () => {
        const reservation = {
            userId: user._id,
            hotelId: id,
            hotelName: name,
            kingRooms,
            queenRooms,
            startDate,
            endDate,
        };
        await axios.post("http://localhost:8800/api/reservation", reservation);
        window.alert(`Your reservation is successful!`);
        handleCloseModal();
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        // Check if the end date is earlier than the start date
        if (endDate < date) {
            setEndDate(date);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        // Check if the end date is earlier than the start date
        if (date < startDate) {
            setStartDate(date);
        }
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


    return (
            <div className="container">
                <Navbar />
                <Header type="list" />
                {loading ? (
                    "Loading result..."
                ) : (
                    <div className="container py-5 text-center">
                        <h1 className="mb-2">{name}</h1>
                        <div className="mb-2 mt-2">
                            <div>
                                <div>
                                    <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                                    <span>{data.address}, {data.city}</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faStar} className="me-2" />
                                    <span className="">Rating: {data.review_score}/10</span>
                                </div>
                            </div>
                            <div className="mt-2 mb-2 mx-auto">
                                <img src={data.main_photo_url} alt="pic" className="rounded-radius" width="400" height="400" />
                            </div>
                        </div>
                        <div className="mt-4 mb-auto d-flex justify-content-center">
                            <button className="btn btn-primary mb-auto" onClick={handleClick}>Reserve Now</button>
                        </div>
                        <button className="btn btn-secondary mt-2 mb-auto" onClick={handleGoBack}>Go Back </button>
                        <SubscribeComponent />
                        <FooterComponent />
                    </div>
                )}
                {openModal && (
                    <ReserveComponent
                        setOpen={setOpenModal}
                        hotelId={id}
                        hotelName={name}
                        kingRooms={kingRooms}
                        queenRooms={queenRooms}
                        startDate={startDate}
                        endDate={endDate}
                        handleStartDateChange={handleStartDateChange}
                        handleEndDateChange={handleEndDateChange}
                        decrementKingRooms={decrementKingRooms}
                        incrementKingRooms={incrementKingRooms}
                        decrementQueenRooms={decrementQueenRooms}
                        incrementQueenRooms={incrementQueenRooms}
                        handleClick={handleReserveClick}
                    />
                )}
            </div>
    );
};

export default Hotel;