import African from '../../assets/img/new/1.png';
import American from '../../assets/img/new/2-1.png';
import Asian from '../../assets/img/new/3.png';
import English from '../../assets/img/new/7.png';
import Caribbean from '../../assets/img/new/4.png';
import French from '../../assets/img/new/5.png';
import Italian from '../../assets/img/new/6.png';
import Japanese from '../../assets/img/Japanese.jpg';
import Mediterranean from '../../assets/img/new/8.png';
import React from 'react';
import './Banner.css'
import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div className='max-width'>
            <div className="gallery">
                <Link to='/menu/african' className="tile large">
                    <img src={African} alt="African Cuisine" />
                    <div className="overlay">
                        <h2>African</h2>
                        <p>Explore authentic African flavors</p>
                    </div>
                </Link>
                <Link to='/menu/american' className="tile">
                    <img src={American} alt="American Cuisine" />
                    <div className="overlay">
                        <h2>American</h2>
                        <p>Classic American favorites</p>
                    </div>
                </Link>
                <Link to="/menu/asian" className="tile">
                    <img src={Asian} alt="Asian Cuisine" />
                    <div className="overlay">
                        <h2>Asian</h2>
                        <p>A journey through Asian tastes</p>
                    </div>
                </Link>
                <Link to="/menu/caribbean" className="tile">
                    <img src={Caribbean} alt="Caribbean Cuisine" />
                    <div className="overlay">
                        <h2>Caribbean</h2>
                        <p>Spice and warmth of the Caribbean</p>
                    </div>
                </Link>
                <Link to="/menu/french" className="tile large">
                    <img src={French} alt="French Cuisine" />
                    <div className="overlay">
                        <h2>French</h2>
                        <p>Elegance of French culinary art</p>
                    </div>
                </Link>
                <Link to="/menu/italian" className="tile">
                    <img src={Italian} alt="Italian Cuisine" />
                    <div className="overlay">
                        <h2>Italian</h2>
                        <p>The heart of Italian cuisine</p>
                    </div>
                </Link>
                <Link to="/menu/english" className="tile">
                    <img src={English} alt="English Cuisine" />
                    <div className="overlay">
                        <h2>English</h2>
                        <p>Experience English delicacies</p>
                    </div>
                </Link>
                <Link to="/menu/mediterranean" className="tile">
                    <img src={Mediterranean} alt="Mediterranean Cuisine" />
                    <div className="overlay">
                        <h2>Mediterranean</h2>
                        <p>Freshness of the Mediterranean</p>
                    </div>
                </Link>
            </div>


        </div>
    );
}

export default Banner;
