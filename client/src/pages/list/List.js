import React, {useContext, useState} from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import SearchItem from "../../components/searchItem/searchItem";
import {AuthContext} from "../../context/AuthContext";


const getDestinationId = async (city) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0afb98c3f5mshef0b27a1e2bd7a9p101631jsndf10887e7257',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };
    //search location
    const response = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${city}&locale=en-us`, options);
    const data = await response.json();

    if (data.result && data.result.length > 0) {
        return data.result[0].dest_id;
    } else {
        throw new Error(`Destination id not found for city "${city}"`);
    }
};
const List = () => {
    const [destination, setDestination] = useState("");
    const [destinationId, setDestinationId] = useState('');

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDestinationChange = async (e) => {
        const city = e.target.value;
        const id = await getDestinationId(city);
        setDestination(city);
        setDestinationId(id);
    };
    const handleClick = async () => {
        setLoading(true);
        setError(null);
        try {
            const checkinDate = format(dates[0].startDate, "yyyy-MM-dd");
            const checkoutDate = format(dates[0].endDate, "yyyy-MM-dd");
            const response = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=${checkinDate}&dest_type=city&units=imperial&checkout_date=${checkoutDate}&adults_number=${options.adult}&order_by=popularity&dest_id=${destinationId}&filter_by_currency=USD&locale=en-us&min_price=${min || 0}&max_price=${max || 999}`, {
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "0afb98c3f5mshef0b27a1e2bd7a9p101631jsndf10887e7257",
                    "X-RapidAPI-Host": "booking-com.p.rapidapi.com"
                }
            });
            const result = await response.json();
            setData(result.result);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };


    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="d-flex justify-content-center" style={{marginTop: '20px'}}>
                <div className="w-100 d-flex" style={{maxWidth: '1024px', gap: '20px'}}>
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input
                                className="lsInput"
                                type="text"
                                placeholder={destination}
                                onChange={handleDestinationChange}
                            />
                        </div>
                        <div className="lsItem">
                            <label className="fs-12">Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>
                                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                            </span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) => setDates([item.selection])}
                                    minDate={new Date()}
                                    ranges={dates}
                                />
                            )}
                        </div>
                        <div className="lsItem">
                            <label className="fs-12">Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        onChange={(e) => setMin(e.target.value)}
                                        className="lsOptionInput"
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        onChange={(e) => setMax(e.target.value)}
                                        className="lsOptionInput"
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adult</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.adult}
                                        onChange={(e) =>
                                            setOptions((prevState) => ({
                                                ...prevState,
                                                adult: parseInt(e.target.value),
                                            }))
                                        }
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Children</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.children}
                                        onChange={(e) =>
                                            setOptions((prevState) => ({
                                                ...prevState,
                                                children: parseInt(e.target.value),
                                            }))
                                        }
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Room</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.room}
                                        onChange={(e) =>
                                            setOptions((prevState) => ({
                                                ...prevState,
                                                room: parseInt(e.target.value),
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ? (
                            "loading"
                        ) : (
                            <>
                                {data.slice(0, 8).map((item) => (
                                    <SearchItem item={item} key={item.id} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
