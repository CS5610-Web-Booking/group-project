import "./subscribe.css";
const SubscribeComponent = () => {
    return (
        <div className="subscribe d-flex flex-column align-items-center">
            <div className="row justify-content-center">
                <div className="text-center">
                    <h1 className="subscribeTitle">To get more deals instantly,</h1>
                    <span className="subscribeDesc">Sign up to our site and we'll send the deals to you</span>
                </div>
                <div className="mt-3 mb-1">
                    <input type="text" className="form-control" placeholder="Your Email Address" />
                </div>
                <div className="mt-3 text-center">
                    <button className="btn btn-primary pb-1">Subscribe</button>
                </div>
            </div>
        </div>
    )
}
export default SubscribeComponent;