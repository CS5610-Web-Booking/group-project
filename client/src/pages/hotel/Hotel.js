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

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '92749f1e5bmshe907383f6ca8192p127a3djsn38dd8aae4860',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${id}&locale=en-us`, options);
            const result = await response.json();
            setData(result);
        };

        fetchData();
    },[id]);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        } else {
            navigate("/login");
        }
        // setOpenModal(true);
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
                <div className="container py-5 text-center">
                        <h1 className="mb-2">{data.name}</h1>
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
                                <button className="btn btn-primary" onClick={handleClick}>Reserve Now</button>
                            </div>
                <SubscribeComponent />
                <FooterComponent />
                </div>
            )}
            {openModal && <ReserveComponent setOpen={setOpenModal} hotelId={id} hotelName={data.name}/>}
        </div>
    );
};

export default Hotel;