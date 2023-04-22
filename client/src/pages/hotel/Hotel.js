import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SubscribeComponent from "../../components/subscribe/Subscribe";
import FooterComponent from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar, faLocationDot,} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ReserveComponent from "../../components/reserve/reserve";

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.slice(-7);
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8954b980cemsh2ee08fc1a6904c3p180332jsn62bc812c340e',
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
                <div className="container py-5">
                    <div className="row mx-auto">
                        <div className="col-md-8 mx-auto">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3">{data.name}</h1>
                                <div>
                                    <p>
                                        <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                                        <span>{data.address}, {data.city}, {data.country}</span>
                                    </p>
                                    <FontAwesomeIcon icon={faStar} className="me-2" />
                                    <span className="">Rating: {data.review_score}/10</span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-4 mb-3 mx-auto">
                                    <img src={data.main_photo_url} alt="pic" className="img-fluid rounded-radius" width="200" height="200" />
                                </div>

                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary" onClick={handleClick}>Reserve Now</button>
                            </div>
                        </div>
                    </div>
                <SubscribeComponent />
                <FooterComponent />
                </div>
            )}
            {openModal && <ReserveComponent setOpen={setOpenModal} hotelId={id }/>}
        </div>
    );
};

export default Hotel;