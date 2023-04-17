import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SubscribeComponent from "../../components/subscribe/subscribe";
import FooterComponent from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot,} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import ReserveComponent from "../../reserve/reserve";

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { data, loading, error } = useFetch(`/hotels/find/${id}`);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { dates, options } = useContext(SearchContext);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
    };

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="container">
            <Navbar />
            <Header type="list" />
            {loading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div className="hotelContainer">
                    {open && (
                        <div className="slider">
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="close"
                                onClick={() => setOpen(false)}
                            />
                            <FontAwesomeIcon
                                icon={faCircleArrowLeft}
                                className="arrow"
                                onClick={() => handleMove("l")}
                            />
                            <div className="sliderWrapper">
                                <img
                                    src={data.photos[slideNumber]}
                                    alt=""
                                    className="sliderImg"
                                />
                            </div>
                            <FontAwesomeIcon
                                icon={faCircleArrowRight}
                                className="arrow"
                                onClick={() => handleMove("r")}
                            />
                        </div>
                    )}
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <button className="btn btn-primary" onClick={handleClick}>
                                        Reserve it Now!
                                    </button>
                                    <h1 className="h3 mb-0">{data.name}</h1>
                                    <div className="mb-4">
                                        <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                                        <span>{data.address}</span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="me-3">Excellent location – {data.distance} miles from the city center
                                        </span>
                                        <span className="text-success">
                                            Book a stay over ${data.cheapestPrice} at this property and get a free airport transportation!
                                        </span>
                                    </div>
                                    <div className="row">
                                        {data.photos?.map((photo, i) => (
                                            <div className="col-md-4 mb-3" key={i}>
                                                <img
                                                    src={photo}
                                                    alt=""
                                                    className="img-fluid rounded"
                                                    onClick={() => handleOpen(i)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <h4 className="card-title mb-4">
                                                    Perfect for a {days} night stay!
                                                </h4>
                                                <p className="card-text mb-4">
                                                    Located in the real heart of XXX, this property has an excellent
                                                    location score of 9.8!
                                                </p>
                                                <h5 className="card-subtitle mb-3">
                                                    <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                                                    nights)
                                                </h5>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handleClick}
                                                >
                                                    Reserve it Now!
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SubscribeComponent />
                    <FooterComponent />
                </div>
            )}
            {openModal && <ReserveComponent setOpen={setOpenModal} hotelId={id}/>}
        </div>
    );
};

export default Hotel;