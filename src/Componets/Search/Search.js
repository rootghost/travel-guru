import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../project_image/Logo.png'
import './Search.css'
import Hotelroom from '../Hotelroom/Hotelroom';
import Hotelroomdata from '../../Fakedata/Hotelroomdata';
import { userContext } from '../../App';
import { Link } from 'react-router-dom';


const Search = () => {
    
    const [isSignedIn,setSignedIn] = useContext(userContext);
    const hotelRoomData = Hotelroomdata;
    console.log(isSignedIn)
    
    return (
        <div>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#"><img style={{height:"56px",wifth:"120.26px"}} src={logo} alt=""/></a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <Link  to="/home">Home</Link>
                            <Link  to="/destination">Destination</Link>
                            <Link  to="/blog">Blog</Link>
                            <Link  to="/contact">Contact</Link>
                            <Link  to="#">{isSignedIn.name}</Link>
                           
                        </div>
                    </div>
                    <hr/>
                </nav>
                
            </div>
            <div className="container">
                <p className="guest-text">252 stays Apr 13-17 3 guests</p>
            </div>
            <div className="container">
                <div className="search-result">
                    <div className="room-details">
                    <h2>Stay in</h2>
                       {
                           hotelRoomData.map(data => <Hotelroom key={data.id} details={data}></Hotelroom>)
                       }
                    </div>

                    <div className="map">

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Search;