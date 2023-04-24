import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import {useState} from "react";
import axios from 'axios';

function Profile() {
  const {user, setUser} = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = async (event) => {
    event.preventDefault();
        try {
        console.log(user._id);
        const updatedUser = await axios.post(`/users/profile/${user._id}`, {
            username,
            email,
          });
          console.log(updatedUser);
          setUser(updatedUser.data);
          alert("User data updated successfully");
        } catch (err) {
          alert("The username or email already exists");
       }
  };

return (
    <div>
      <Navbar />
      <h2>Profile</h2>
      {user ? (
        <form onSubmit={handleUpdate}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;