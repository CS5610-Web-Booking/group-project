import "./header.css";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faTaxi } from '@fortawesome/free-solid-svg-icons';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const[date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult:1,
        children:0,
        room:1,
    });

     const navigate = useNavigate();
     const { user } = useContext(AuthContext);

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
     dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
     navigate("/hotels", { state: { destination, dates, options } });
    };

    return (
        <div className="header">
          <div className={type==="list" ?"headerCon listMode" : "headerCon"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Hotels</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faLandmark} />
                    <span>Things to do</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Taxis</span>
                </div>
            </div>
            {type !== "list" &&
                <>
                <h1 className="headerTitle">Best Choice For Your Travel Experience</h1>
                <p className="headerDescription">Join Us Today For 15% Off!</p>
                <button className="headerButton1">Sign in / Register</button>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                        <input type="text" placeholder="Destination" className="headerSearchInput"/>
                    </div>
                    <div className="headerSearchItem">
                       <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                       <span onClick={()=>setOpenDate(!openDate)}className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                       {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="headerDate"
                       />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                       <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult ${options.children} children ${options.room} room`}</span>
                       {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                                <span className="optionCounterNumber"></span>
                                <button className="optionCounterButton " onClick={()=>handleOption("adult", "i")}>+</button>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                                <span className="optionCounterNumber"></span>
                                <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Room</span>
                                <button disabled={options.room <= 1} className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                                <span className="optionCounterNumber"></span>
                                <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                            </div>
                       </div>}
                    </div>
                    <div className="headerSearchItem">
                       <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>
            </div> </>}
         </div>
      </div>
    );
}

export default Header;