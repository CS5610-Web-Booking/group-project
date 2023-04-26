import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import React from "react";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEUAAAD///+ampr4+PgNDQ1XV1eenp5OTk6YmJh2dnaPj48RERHQ0NBFRUXc3Nyfn5+9vb18fHxhYWGFhYVtbW1cXFwhISHW1tY0NDS3t7cICAj19fVlZWUjIyOLi4ulpaXr6+saGhqBgYG6urrj4+PHx8c8PDwpKSlAQEAvLy9c7ULIAAAEQklEQVR4nO3Z7XaiOhiGYQQFxKlUxY9qa7VTO53zP8FdJG8+IFpRtl1r7/v6JYGIjwlJgCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP+EVTIwktXtX/iyiVrpTe3aH7p4bxcPe6q0qJ8ukz3JcXMQpko2OhY8p3EeG3mcPt+acNFryUn4qotDN6Gyq51tv5E9VcJ5HCppmXCf5mFdnL78ZEL9g90sOmFv657N/CPehFncCPgVMfvBhHOrfOBNuOnbJ/sTnU2YNFuwlNtffeeEB6v8yZuwF9snezLlvoQzvXW8CPXG7KaEL20TWlf+yC7fjLwJI+sqWlmHq4R5bCXMdL+clXSfzayvbm+tB+axOvdwcM58YepunegTb0K7be0mrxIuVqtMJ1ykKqB0k7n02j+3JDR+qXN/Xlxj3LP9MjvshD3diAO7NJFSk/BFJTQjizTq31uzVSThw6UVklr/NbOzk/AgpcvLElqXnVyYHbfhxQll6JemNIOKk1DCFL5CO2E/O5EwdZYT12udcFcdH0lb7vQeN6Hqvu/fJZRAppduq8i1SfVqbRM+6wDS/fS85Sasht83t8yXUM2HufyCz7yL+fBUwuf3cZM95+mRcRLM1KfHEwnfy7KNW+ZLGExUpElRkq23jgLWEtZ+ZGVpHy+F5mO0riWUJcwwCMJakTdhMIzNhK+m/HgSdKVlwkyVHayq8m9L5d/qUt0FC9WES2l5f8LgIaxLgs60TCgDR2EdPK4lfJLxcybjbnI+YdEIGIbDH0oo03dUbuwjp66u/CiLgiiSBpezeBNu/fcW66AbFyQcm6NlEf37uCUt81pPOHW/4PNsQnUVhvoGOOz2SvQnXA4nhll199UVpm41pDfu6gmdtWi5Rj2T8K9KlM+KYamYqXVp3MGzjNMJH/0H60hVDxrJXDCtV/6wEwZnExZq8JzrswxUSeNhyB0SysEyQz6q7UOjsnVPmJ1P2FyjyTquo0VNm4R7+dHyf+tFZ7OyDrizz9JI2F+rT/bAonfePWFq/+gjGU23jcoycfaG5xP205MJw5tuga9KKOPMqy6RzjhuVlYHL52zeBJKG1px7pHw8PHgSMqrRN/LmlW6vllMGgmL4xL3ffBNQvnUHGnC7N/spQ3laCkNtrOq2816pgN8P9J8DSxvla3M+bc9iroioZ4b7Adpsi4r54/rEhbuozbrYVtHC7fLE07ksz0T625aXJtw5VuzHRN+3DuhHDl26stS/HBtwmDijxh3dYN4cUL92DN16udSPGqXMNYJ11vfQ++8o3GmXEFWb4Uk4cl3T7HscjvPgxyRSWXnOXjtLJJwvbXfPU2z0H71VL58yqbNL7lSv6KmnvWo7/W1e68+1m9qzCG68ndnORasv+hDndeH3bxABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPA/9g/rwj5XvWpU/AAAAABJRU5ErkJggg=="
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Team 18</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">team18@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    225 terry ave N. seattle, WA 98109
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
