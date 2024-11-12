import React from 'react';
import Header from '../layout/Header';
import Banner from '../components/Home/Banner';
import Footer from '../layout/Footer';
import Login from '../components/Login/Login';

const LoginPage = () => {
    return (
        <div>
            <Header />
            <Login />
            <Footer />
        </div>
    );
}

export default LoginPage;
