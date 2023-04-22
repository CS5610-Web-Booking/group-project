import { Link } from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const SearchItem = ({ item }) => {
    const {user} = useContext(AuthContext);
    const grossAmountPerNight = user.isVIP
        ? item.price_breakdown.all_inclusive_price * 0.9
        : item.price_breakdown.all_inclusive_price;
    // const grossAmountPerNight = item.price_breakdown.all_inclusive_price * 0.9;
    return (
        <div className="border rounded p-3 d-flex justify-content-between gap-3 mb-3 mt-2">
            <img src={item.main_photo_url} alt="" className="flex-shrink-0 rounded" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            <div className="flex-grow-1 d-flex flex-column gap-3">
                <h1 className="h5 text-primary m-0">{item.hotel_name}</h1>
                <span className="text-muted fs-6">{item.distance_to_cc_formatted} from center</span>
                <span className="fs-6">{item.address}, {item.zip}, {item.country_trans}</span>
                <span className="text-success fw-bold fs-6">Free cancellation, reserve it now!</span>
            </div>
            <div className="flex-shrink-0 d-flex flex-column justify-content-between">
                <div className="d-flex flex-column gap-1 text-end">
                    {item.review_score_word && item.review_score && (
                        <>
                            <span className="fw-bold text-success">{item.review_score_word}</span>
                            <button className="btn btn-primary btn-sm ms-2">{item.review_score}</button>
                        </>
                    )}
                </div>

                <div className="text-end d-flex flex-column gap-1">
                    {user.isVIP && <span className="text-danger fs-6">You save 10% as our VIP</span>}
                    <span className="fs-4">${grossAmountPerNight.toFixed(2)} {item.price_breakdown.currency}</span>
                    <span className="text-muted fs-6">With taxes and fees included</span>
                    <Link to={`/hotels/${item.id}`}>
                        <button className="btn btn-primary">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
