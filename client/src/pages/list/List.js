import React, {useContext, useEffect, useState} from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import SearchItem from "../../components/searchItem/searchItem";
import {AuthContext} from "../../context/AuthContext";
import {useLocation} from "react-router-dom";
import axios from "axios";


const List = () => {
    const location = useLocation();
    console.log("location: ", location, "destination: ", location.state.destination, "dates: ", location.state.dates, "options: ", location.state.options);
    const [destination, setDestination] = useState(location.state.destination);
    const [destinationId, setDestinationId] = useState("");
    const [dates, setDates] = useState(location.state.dates);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const getDestinationId = (destination) => {
        try {
            const response = axios.get(
                `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${destination}&locale=en-us`,
                {
                    headers: {
                        'X-RapidAPI-Key': '8954b980cemsh2ee08fc1a6904c3p180332jsn62bc812c340e',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    },
                }
            );
            const result = response.data;

            if (result.result && result.result.length > 0) {
               return result.result[0].dest_id;
            } else {
                throw new Error(`Destination id not found for city "${destination}"`);
            }
        } catch (err) {
            console.error(err);
        }
    };



    const handleDestinationChange = async (e) => {
        const city = e.target.value;
        const id = await getDestinationId(city);
        setDestination(city);
        setDestinationId(id);
    };

    useEffect(() => {
        setLoading(true);
        const header = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8954b980cemsh2ee08fc1a6904c3p180332jsn62bc812c340e',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };
        // ${format(dates[0].startDate, "yyyy-MM-dd").toString()}
       const fetchData = async() => {
           const responseA = await fetch (`https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${destination}&locale=en-us`, header);
           const resultA = await responseA.json();
           const destinationId = resultA[0].dest_id;

           const responseB = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=${format(dates[0].startDate, "yyyy-MM-dd").toString()}&dest_type=city&units=imperial&checkout_date=${format(dates[0].endDate, "yyyy-MM-dd").toString()}&room_number=${options.room}&adults_number=${options.adult}&order_by=review_score&dest_id=${destinationId}&filter_by_currency=USD&locale=en-us&min_price=${min || 0}&max_price=${max || 999}`, header);
           const resultB = await responseB.json();
           setLoading(false);
           setData(resultB.result);

       };

       fetchData();



    }, [dates,destination,options,min,max]);

    return (
        <div>
            <Navbar/>
            <Header type="list"/>
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
                                value={destination}
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
                        {/*<button onClick={handleClick}>Search</button>*/}
                    </div>
                    <div className="listResult">
                        {loading ? (
                            "loading"
                        ) : (
                            <>
                                {data.length > 0 ? (
                                    data.length > 8 ? (
                                        data.slice(0, 8).map((item) => (
                                            <SearchItem item={item} key={item.id} />
                                        ))
                                    ) : (
                                        data.map((item) => (
                                            <SearchItem item={item} key={item.id} />
                                        ))
                                    )
                                ) : (
                                    <p>No results found.</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
