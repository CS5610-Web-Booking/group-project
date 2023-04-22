import React from 'react';
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import SubscribeComponent from "../../components/subscribe/Subscribe";
import FooterComponent from "../../components/footer/footer";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Header/>
            <div className="homeCon">
                <Featured/>
                <h1 className="homeTitle">Property type</h1>
                <PropertyList/>
                <h1 className="homeTitle">Guests love</h1>
                <FeaturedProperties/>
                <SubscribeComponent/>
                <FooterComponent/>
            </div>
        </div>
    )
}
export default Home;