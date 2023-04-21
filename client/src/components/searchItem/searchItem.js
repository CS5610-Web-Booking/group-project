import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
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
                {item.rating && <div className="d-flex flex-column gap-1">
                    <span className="fw-bold text-success">{item.review_score_word}</span>
                    <button className="btn btn-primary">{item.review_score}</button>
                </div>}
                <div className="text-end d-flex flex-column gap-1">
                    <span className="fs-4">${item.gross_amount_per_night.value} {item.gross_amount_per_night.currency}</span>
                    <span className="text-muted fs-6">Taxes and fees included</span>
                    <Link to={`/hotels/${item.id}`}>
                        <button className="btn btn-primary">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
