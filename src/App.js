
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';

import { AuthProvider, RequireAuth } from "react-auth-kit";
import OrderDetail from './pages/OrderDetailPage';
import './assets/css/style.css';
import AboutUsPage from './pages/AboutUsPage';
import ContactUs from './pages/ContactUs';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
const Router = () => {
  return (

    <AuthProvider authType={"localstorage"} authName={"auth"}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/menu/:food"
            element={
              <RequireAuth loginPath={"/auth/login"}>
                <OrderDetail />
              </RequireAuth>
            }
          />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>

    </AuthProvider>
  );
};

export default Router;
