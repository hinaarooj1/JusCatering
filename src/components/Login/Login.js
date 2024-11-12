import React, { useState, useEffect } from 'react'

import { useAuth } from "../../store/auth";

import { useSignIn, useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { loginApi } from "../../Api/Service";
import { toast } from "react-toastify";

import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Login.css'


const Login = () => {
    const [isloading, setisloading] = useState(false);
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();
    const authUser = useAuthUser();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type1, settype1] = useState("password");

    const handleTogglePassword = () => {
        type1 === "password"
            ? settype1("text")
            : type1 === "text"
                ? settype1("password")
                : settype1("password");
    };

    const { storeTokenInLs } = useAuth();
    const onLogin = async (e) => {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errorObj.email = 'Please enter a valid email address';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
            return;
        }
        setisloading(true);
        try {
            let data = { email, password };

            const updateHeader = await loginApi(data);
            let newData = updateHeader;
            if (updateHeader.success === true && updateHeader.link === false) {


                newData = {
                    success: updateHeader.success,
                    token: updateHeader.token,
                    user: {
                        _id: updateHeader.user._id,
                        address: updateHeader.user.address,
                        city: updateHeader.user.city,
                        country: updateHeader.user.country,
                        email: updateHeader.user.email,

                        firstName: updateHeader.user.firstName,
                        lastName: updateHeader.user.lastName,

                        phone: updateHeader.user.phone,
                        postalCode: updateHeader.user.postalCode,
                        role: updateHeader.user.role,
                    },
                };
            }
            if (
                updateHeader.success && updateHeader.link === false &&
                signIn({
                    token: updateHeader.token.token,
                    expiresIn: 4317,
                    tokenType: "Bearer",
                    authState: newData,
                    sameSite: false,
                })
            ) {
                storeTokenInLs(updateHeader.token);
                toast.dismiss();
                toast.success(updateHeader.msg);
                const redirectTo = location.state?.from || '/';  // Default to home if no previous location
                navigate(redirectTo);
            } else if (updateHeader.success === true && updateHeader.link === true) {
                toast.dismiss();
                toast.info(updateHeader.msg);
                console.log(updateHeader);
                setPassword("");
                return
            } else {
                toast.dismiss();
                toast.error(updateHeader.msg);
                console.log(updateHeader);
            }
        } catch (error) {
            console.log('error: ', error);
            toast.dismiss();
            toast.error(error?.data?.msg || "Something went wrong");
        } finally {
            setisloading(false);
        }

    }

    useEffect(() => {

        if (isAuthenticated() && authUser().user.role === "user") {
            navigate("/");

            return;
        }
        if (isAuthenticated() && authUser().user.role === "admin") {
            navigate("/");
        } else if (isAuthenticated() && authUser().user.role === "subadmin") {
            navigate("/");
        }
    }, []);
    // 
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);



    return (
        <div className="contact-us">




            <section className="contact-form-section">
                <h2>Login</h2>
                <form className="contact-form lea" onSubmit={onLogin}>

                    <label htmlFor="email">Email</label>
                    <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Type Your Email Address" />

                    {errors.email && <div className="text-danger txtp fs-12">{errors.email}</div>}
                    <div style={{ position: "relative" }}>
                        <label htmlFor="phone">Password</label>
                        <input type={type1}
                            className="form-control"
                            value={password}
                            placeholder="Type Your Password"
                            onChange={(e) =>
                                setPassword(e.target.value)
                            } />
                        <span onClick={handleTogglePassword} className="show-pass   eye">
                            {type1 === "password" ? (
                                <i className="fa fa-eye-slash" />
                            ) : (
                                <i className="fa fa-eye" />
                            )}

                        </span>
                    </div>
                    {errors.password && <div className="text-danger txtp fs-12">{errors.password}</div>}

                    <br />

                    <button type="submit" disabled={isloading} className='reg-btn submit-buttons' > {isloading ? (
                        <div className="loader"></div>
                    ) : (
                        'Login'
                    )}</button>
                </form>
                <p>Don't have an account? <Link className="lofa" to="/auth/register">Register Here</Link></p>

            </section>
        </div>
    );
}

export default Login;
