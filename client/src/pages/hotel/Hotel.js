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

const Hotel = () => {
    const location = useLocation();
    const path = location.pathname;
    const matches = path.match(/\d+$/);
    const id = parseInt(matches.pop());

    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");


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
                {openModal && <ReserveComponent setOpen={setOpenModal} hotelId={id} hotelName={name}/>}
            </div>
    );
};

export default Hotel;