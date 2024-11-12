import React from 'react';
import Banner from '../components/Aboutus/Banner';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Contact from '../components/OrderDetails/Contact';

const AboutUsPage = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Contact />
            <Footer />
        </div>
    );
}

export default AboutUsPage;
