import React from 'react';
import Header from '../layout/Header';
import Banner from '../components/Home/Banner';
import Footer from '../layout/Footer';
import Register from '../components/Register/Register';

const RegisterPage = () => {
    return (
        <div>
            <Header />
            <Register />
            <Footer />
        </div>
    );
}

export default RegisterPage;
