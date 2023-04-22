import "./featured.css"

const Featured = () => {

    return (
        <div className="featured">
            <div className="featuredItem">
              <img src={`https://thepointsguy.global.ssl.fastly.net/us/originals/2020/01/Aspen-Colorado.jpg?width=3840`} alt=""></img>
                <div className="featuredTitles">
                    <h1>Aspen, US</h1>
                 </div>
            </div>
            <div className="featuredItem">
              <img src={`/images/place2.png`}alt=""></img>
                <div className="featuredTitles">
                    <h1>Rome, Italy</h1>
                 </div>
            </div>
            <div className="featuredItem">
              <img src={`/images/place3.png`} alt=""></img>
                <div className="featuredTitles">
                    <h1>Paris, France</h1>
                 </div>
            </div>)
        </div>
   );
};
export default Featured;