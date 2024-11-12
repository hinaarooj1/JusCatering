import React from 'react';
import Header from '../layout/Header';
import Banner from '../components/OrderDetails/Banner';
import Contact from '../components/Home/Contact';
import Footer from '../layout/Footer';

const OrderDetailPage = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Contact />
            <Footer />
        </div>
    );
}

export default OrderDetailPage;
