import "./subscribe..css";
const SubscribeComponent = () => {
    return (
        <div className="container mail">
            <div className="row justify-content-md-center">
                <div className="col-md-8 text-center">
                    <h1 className="mailTitle">To get more deals instantly,</h1>
                    <span className="mailDesc">Sign up to our site and we'll send the deals to you</span>
                </div>
            </div>
            <div className="row justify-content-md-center mt-3">
                <div className="col-md-8">
                    <form>
                        <div className="row align-items-center">
                            <div className="col-9">
                                <input type="text" className="form-control" placeholder="Your Email Address" />
                            </div>
                            <div className="col-3">
                                <button type="submit" className="btn btn-primary w-100">Subscribe and Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SubscribeComponent;