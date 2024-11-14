import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import './Header.css';
import { useAuthUser } from "react-auth-kit";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    let authUser = useAuthUser();
    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="main-header">
            <div className="top-bar">
                Jus Catering cares about your event so please give us 3 - 5 days for order to have the best experience.
            </div>
            <div className="max-width flex">
                <div className="left-logo">
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>

                <div className="hamburger" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </div>

                <div className={`right-links ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li className="menu-dropdown">
                            <a style={{ cursor: 'pointer' }}>Menu <i className="fa-solid fa-chevron-down"></i></a>
                            <ul className="dropdown-content">
                                <li><Link to="/menu/african">African</Link></li>
                                <li><Link to="/menu/american">American</Link></li>
                                <li><Link to="/menu/asian">Asian</Link></li>
                                <li><Link to="/menu/caribbean">Caribbean</Link></li>
                                <li><Link to="/menu/french">French</Link></li>
                                <li><Link to="/menu/italian">Italian</Link></li>
                                <li><Link to="/menu/english">English</Link></li>
                                <li><Link to="/menu/mediterranean">Mediterranean</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            {authUser() ? <><i class="fa-solid fa-user"></i> {" "} {authUser().user.firstName}{" "}{authUser().user.lastName}</> : <Link to="/auth/login">Login/Sign up</Link>}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
