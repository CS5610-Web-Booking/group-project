import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import {useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import "./profile.css";

function Profile() {
  const {user, setUser} = useContext(AuthContext);
  const [username, setUsername] = useState(user? user.username:"");
  const [email, setEmail] = useState(user? user.email:"");
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user? user.city:"");
  const [phone, setPhone] = useState(user? user.phone:"");
  const [reservations, setReservations] = useState(null);

   useEffect(() => {
     if (user) {
       async function fetchReservations() {
         try {
           const response = await axios.get(`/reservation/user/${user._id}`);
           if(response === null) {
             setReservations([]);
           } else {
            setReservations(response.data.reservations);
           }
           console.log(response.data);
         } catch (error) {
           console.error(error);
         }
       }
       fetchReservations();
     }
   }, [user]);

   const handleClickHome = () => {
    window.location.replace("/");
    };

  const handleUpdate = async (event) => {
    event.preventDefault();
        try {
        if(user === null) {
          //nothing occurs
        } else
        {const updatedUser = await axios.put(`/users/${user._id}`, {
                username,
                email,
                country,
                city,
                phone,
              });
              localStorage.setItem('user', JSON.stringify(updatedUser.data));
              console.log(updatedUser);
              setUser(updatedUser.data);
              alert("User data updated successfully");
              }
        } catch (err) {
          alert("The username or email already exists");
       }
  };

    useEffect(() => {
      setUsername(user ? user.username : "");
      setEmail(user ? user.email : "");
      setCountry(user ? user.country : "");
      setCity(user ? user.city : "");
      setPhone(user ? user.phone : "");
    }, [user]);



return (
    <div>
      <Navbar />
      <div className="profileCon">
        <div className="pContainer">
           <h1>Profile</h1>
           <h4>User Information</h4>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>
                Username:
              </label>
                <input
                  type="text"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                  className="Input"
                />
              </div>

              <div className="form-group">
              <label>
                Email:
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="Input"
                />
              </div>

              <div className="form-group">
               <label>
                  Country:
                </label>
                  <input
                    type="text"
                    onChange={(event) => setCountry(event.target.value)}
                    value={country}
                    className="Input"
                  />
                </div>
                <div className="form-group">
                <label>
                  City:
                </label>
                  <input
                    type="text"
                    onChange={(event) => setCity(event.target.value)}
                    value={city}
                    className="Input"
                  />
                </div>
                <div className="form-group">
                <label>
                  Phone:
                </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="Input"
                  />
                </div>
                <div className ="reservationCon">
                <h4>Reservations</h4>
                  {user && reservations && reservations.length > 0 ? (<div>
                  {reservations.map((reservation) => (
                    <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }} key={reservation._id}>
                        <p>Hotel Name: {reservation.hotelName}</p>
                        <p>Start Date: {reservation.startDate.slice(0, 10)}</p>
                        <p>End Date: {reservation.endDate.slice(0, 10)}</p>
                        <p>King Room: {reservation.kingRooms}</p>
                        <p>Queen Room: {reservation.queenRooms}</p>
                    </div>
                    ))}
                  </div>):(<p>No reservations</p>)}

               </div>
               {user? (<button type="submit" className="Button">Update</button>):(<p className="linkMargin"><Link to="/login"> Login</Link> to see your profile</p>)}
               <button onClick={handleClickHome} className="Button"> Return To Home</button>
            </form>
         </div>
      </div>
    </div>
  );
}

export default Profile;