import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SubscribeComponent from "../../components/subscribe/Subscribe";
import FooterComponent from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLocationDot,} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ReserveComponent from "../../components/reserve/reserve";

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [openModal, setOpenModal] = useState(false);

    const { data, loading, error } = useFetch(`https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${id}&locale=en-gb`);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

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
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <button className="btn btn-primary" onClick={handleClick}>
                                        Reserve it Now!
                                    </button>
                                    <h1 className="h3 mb-0">{data.hotel_name}</h1>
                                    <div className="mb-4">
                                        <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                                        <span>`${data.address_trans}, ${data.city_trans}, ${data.country_trans}`</span>
                                    </div>
                                    <div className="mb-4">
                                        <span className="me-3">{data.review_score_word} rating
                                        </span>
                                    </div>
                                    <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <img
                                                    src={data.main_photo_url}
                                                    alt=""
                                                    className="img-fluid rounded-radius"
                                                />
                                            </div>
                                    </div>
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