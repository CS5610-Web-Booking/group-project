const FooterComponent = () => {
    return (
        <div className="w-100 fs-12 mt-3" >
                <div className="w-100 d-flex justify-content-around ms-auto me-auto" style={{maxWidth: '1024px'}}>
                    <ul className="fList text-muted">
                        <li className="fListItem">Countries</li>
                        <li className="fListItem">Cities</li>
                        <li className="fListItem">Hotels</li>
                    </ul>
                    <ul className="fList text-muted">
                        <li className="fListItem">Homes </li>
                        <li className="fListItem">Apartments </li>
                        <li className="fListItem">Resorts </li>
                    </ul>
                    <ul className="fList text-muted">
                        <li className="fListItem">Unique places to stay </li>
                        <li className="fListItem">Reviews</li>
                        <li className="fListItem">Seasonal and holiday deals </li>
                    </ul>
                    <ul className="fList text-muted">
                        <li className="fListItem">Car rental </li>
                        <li className="fListItem">Flight information</li>
                        <li className="fListItem">Restaurant reservations </li>
                    </ul>
                    <ul className="fList text-muted">
                        <li className="fListItem">Customer Service</li>
                        <li className="fListItem">Careers</li>
                        <li className="fListItem">Terms & conditions</li>
                    </ul>
                </div>
                <p className="w-100 mt-8 mb-8 text-muted text-center">Copyright © 2023 WEBDEV5610</p>
        </div>
    );
};

export default FooterComponent;