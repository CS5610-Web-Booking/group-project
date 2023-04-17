import React, { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import "./list.css";
import SearchItem from "../../components/searchItem/searchItem";

const List = () => {
    const [destination, setDestination] = useState("");
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

    const { data, loading, error, reFetch } = useFetch(
        `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
    );

    const handleClick = () => {
        reFetch();
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
                                onChange={(e) => setDestination(e.target.value)}
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
                                {data.map((item) => (
                                    <SearchItem item={item} key={item._id} />
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


