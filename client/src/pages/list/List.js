import React, {useContext, useEffect, useState} from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import SearchItem from "../../components/searchItem/searchItem";
// import {AuthContext} from "../../context/AuthContext";
import {useLocation} from "react-router-dom";
import {SearchContext} from "../../context/SearchContext";


const List = () => {
    let location = useLocation();
    const { dispatch } = useContext(SearchContext);
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        const header = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '92749f1e5bmshe907383f6ca8192p127a3djsn38dd8aae4860',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };
        // ${format(dates[0].startDate, "yyyy-MM-dd").toString()}
       const fetchData = async() => {
           const responseA = await fetch (`https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${destination}&locale=en-us`, header);
           const resultA = await responseA.json();
           const destinationId = resultA[0].dest_id;
           const responseB = await fetch(`https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=${format(dates[0].startDate, "yyyy-MM-dd").toString()}&dest_type=city&units=imperial&checkout_date=${format(dates[0].endDate, "yyyy-MM-dd").toString()}&adults_number=${options.adult}&order_by=review_score&dest_id=${destinationId}&filter_by_currency=USD&locale=en-gb&room_number=${options.room}`, header);
           const resultB = await responseB.json();
           setLoading(false);
           setData(resultB.result);
       };

       if(dates != null && dates.length >= 1){
           fetchData();
       }




    }, [dates,destination,options]);

    const handleDestinationChange = (e) => {
        const city = e.target.value;
        setDestination(city);
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    };

    const handleDateChange = (item) => {

        setDates([item.selection]);
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    };

    const handleAdultChange = (e) => {
        setOptions({
                children:options.children,
                room:options.room,
                adult: parseInt(e.target.value) // new adult value
        });
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    };

    const handleRoomChange = (e) => {
        setOptions(prevState => ({
            ...prevState,
            room: parseInt(e.target.value)
        }));
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    };

    const handleChildrenChange = (e) => {
        setOptions(prevState => ({
            ...prevState,
            children: parseInt(e.target.value)
        }));
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    };

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
                                    onChange={handleDateChange}
                                    minDate={new Date()}
                                    ranges={dates}
                                />
                            )}
                        </div>
                        <div className="lsItem">
                            <label className="fs-12">Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adult</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.adult}
                                        onChange={handleAdultChange}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Children</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.children}
                                        onChange={handleChildrenChange}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Room</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.room}
                                        onChange={handleRoomChange}
                                    />
                                </div>
                            </div>
                        </div>
                        {/*<button onClick={handleClick}>Search</button>*/}
                    </div>
                    <div className="listResult">
                        {loading ? (
                            "Loading result..."
                        ) : (
                            <>
                                {data!= null && data.length > 0 ? (
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
