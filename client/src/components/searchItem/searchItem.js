import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
    return (
        <div className="border rounded p-3 d-flex justify-content-between gap-3 mb-3 mt-2">
            <img src={item.photos[0]} alt="" className="flex-shrink-0 rounded" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            <div className="flex-grow-1 d-flex flex-column gap-3">
                <h1 className="h5 text-primary m-0">{item.name}</h1>
                <span className="text-muted fs-6">{item.distance}m from center</span>
                <span className="bg-success text-white p-1 rounded-2 fs-6">Free airport taxi</span>
                <span className="fw-bold fs-6">Studio Apartment with Air conditioning</span>
                <span className="fs-6">{item.desc}</span>
                <span className="text-success fw-bold fs-6">Free cancellation, reserve it now!</span>
            </div>
            <div className="flex-shrink-0 d-flex flex-column justify-content-between">
                {item.rating && <div className="d-flex flex-column gap-1">
                    <span className="fw-bold text-success">Excellent</span>
                    <button className="btn btn-primary">{item.rating}</button>
                </div>}
                <div className="text-end d-flex flex-column gap-1">
                    <span className="fs-4">${item.cheapestPrice}</span>
                    <span className="text-muted fs-6">Taxes and fees included</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="btn btn-primary">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
