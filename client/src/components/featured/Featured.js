import useFetch from"../../hooks/useFetch";
import "./featured.css"

const Featured = () => {

//     const {data, loading, error} = useFetch("/hotels/countByCity?cities=berlin,madrid,london");

    return (
        <div className="featured">
            <div className="featuredItem">
              <img src={`/images/place1.png`} alt=""></img>
                <div className="featuredTitles">
                    <h1>Rome</h1>
                 </div>
            </div>
            <div className="featuredItem">
              <img src={`/images/place2.png`}alt=""></img>
                <div className="featuredTitles">
                    <h1>Field</h1>
                 </div>
            </div>
            <div className="featuredItem">
              <img src={`/images/place3.png`} alt=""></img>
                <div className="featuredTitles">
                    <h1>Paris</h1>
                 </div>
            </div>)
        </div>
   );
};
export default Featured;