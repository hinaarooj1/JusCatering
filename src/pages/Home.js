import React from 'react';
import Header from '../layout/Header';
import Banner from '../components/Home/Banner';
import Contact from '../components/Home/Contact';
import Footer from '../layout/Footer';

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;
