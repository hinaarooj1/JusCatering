import React from 'react';
import './Contact.css'
import { Link } from 'react-router-dom';
const Contact = () => {
    return (
        <div className='contact-sec'>
            <div className="max-width">
                <h1>CONTACT US</h1>
                <p>We’ll make sure to leave you plenty of time to enjoy your day. <br />  Click below or call 111.111.1111 to begin.</p>
                <Link
                    to="/contact">Send Message</Link>
            </div>
        </div>
    );
}

export default Contact;
