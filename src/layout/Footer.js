import logo from '../assets/img/logo.png';
import React from 'react';
import './Footer.css'
const Footer = () => {
    return (
        <div className=''>
            <div className='max-width flex  jus'>
                <div className='max-fot  justify-between py-5'>
                    <p>Address: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, neque, a consectetur veritatis dolorem</p>
                </div>
                <a href='' className="logo-footer">
                    <img src={logo} alt="" />
                </a>
                <div className=' max-fot justify-between'>
                    <p>Office hours:</p>
                    <p>Monday to Friday</p>
                    <p>8am – 12:30pm & 1pm – 5pm</p>
                </div>
            </div>

        </div>
    );
}

export default Footer;
