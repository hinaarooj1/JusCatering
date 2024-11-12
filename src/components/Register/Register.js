import React, { useState, useEffect } from 'react';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSignIn, useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { toast } from "react-toastify";
import { loginApi, registerApi } from "../../Api/Service";
const Register = () => {
    const [isloading, setisloading] = useState(false);
    const [chkbx, setchkbx] = useState(false);
    const [verifyP, setverifyP] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const isAuthenticated = useIsAuthenticated();
    const authUser = useAuthUser();
    const navigate = useNavigate();
    const [type2, settype2] = useState("password");
    const [type1, settype1] = useState("password");

    const handleTogglePassword = () => {
        type1 === "password"
            ? settype1("text")
            : type1 === "text"
                ? settype1("password")
                : settype1("password");
    };
    const handleTogglePassword1 = () => {
        type2 === "password"
            ? settype2("text")
            : type2 === "text"
                ? settype2("password")
                : settype2("password");
    };
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        note: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        cpassword: "",
    });
    let handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value });

        if (userData.password.length > 6) {
            setverifyP(true);
        } else if (userData.password.length < 8) {
            setverifyP(false);
        }
    };
    let toggleagree = (e) => {
        if (e.target.checked === true) {
            setchkbx(true);
        } else if (e.target.checked === false) {
            setchkbx(false);
        }
    };


    const onSignUp = async (e) => {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };

        if (!userData.firstName.trim()) {
            errorObj.firstName = 'Password is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.password,
            })
        }
        if (!userData.lastName.trim()) {
            errorObj.lastName = 'Last Name is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.email,
            })
        }
        if (!userData.phone.trim()) {
            errorObj.phone = 'Phone is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.email,
            })
        }
        if (!userData.phone.trim()) {
            errorObj.phone = 'Phone is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.email,
            })
        }
        if (!userData.country.trim()) {
            errorObj.country = 'Country is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.email,
            })
        }
        if (!userData.postalCode.trim()) {
            errorObj.postalCode = 'Postal Code is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.email,
            })
        }
        if (!userData.city.trim()) {
            errorObj.city = 'City is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.email,
            })
        }
        if (!userData.address.trim()) {
            errorObj.address = 'Address is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.email,
            })
        }
        if (!userData.email.trim()) {
            errorObj.email = 'Email is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.email,
            });
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            errorObj.email = 'Please enter a valid email address';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.email,
            });
        }
        if (userData.password === '') {
            errorObj.password = 'Password is Required';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.password,
            });
        } else if (userData.password.length < 8) {
            errorObj.password = 'Password must be at least 8 characters long';
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.password,
            });
        }
        if (userData.password != userData.cpassword) {
            errorObj.cpassword = "Password and confirm password doesn't match";
            error = true;
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: errorObj.cpassword,
            })
        }

        setErrors(errorObj);
        if (error) return;
        setisloading(true)
        try {

            let data = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                phone: userData.phone,
                address: userData.address,
                city: userData.city,
                country: userData.country,
                postalCode: userData.postalCode,
            };

            const updateHeader = await registerApi(data);

            if (updateHeader.success) {
                toast.dismiss();
                toast.info(updateHeader.msg);
                navigate("/auth/login");
            } else {
                toast.dismiss();
                toast.error(updateHeader.msg);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error?.data?.msg || error?.message || "Something went wrong");
        } finally {
            setisloading(false);
        }
    }
    return (
        <div className="contact-us">


            <section className="contact-form-section">
                <h2>Sign up</h2>
                <form className="contact-form coa" onSubmit={onSignUp}>
                    <div className='flex-two'>
                        <div className='each-diva'>
                            <label htmlFor="fname">First Name</label>
                            <input type="text" onChange={handleInput}
                                value={userData.firstName}
                                name="firstName"
                                placeholder="First Name" />

                            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                        </div>

                        <div className='each-diva'>
                            <label htmlFor="lname">Last Name</label>
                            <input onChange={handleInput}
                                value={userData.lastName}
                                name="lastName"
                                type="text"
                                placeholder="Last Name" />

                            {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                        </div>
                    </div>
                    <div className='flex-two'>
                        <div className='each-diva'>
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                onChange={handleInput}
                                value={userData.email}
                                name="email"
                                placeholder="Email Address" />

                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>

                        <div className='each-diva'>
                            <label htmlFor="phone">Phone</label>
                            <input onChange={handleInput}
                                type="number"
                                onFocus={() => (window.onwheel = () => false)} // Disable scrolling on focus
                                onBlur={() => (window.onwheel = null)}
                                onKeyDown={(e) =>
                                    [
                                        "ArrowUp",
                                        "ArrowDown",
                                        "e",
                                        "E",
                                        "+",
                                        "-",
                                        "*",
                                        "",
                                    ].includes(e.key) && e.preventDefault()
                                }
                                value={userData.phone}
                                name="phone"
                                placeholder="Ex: 1 234 5678" />

                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
                        </div>
                    </div>
                    <div className='flex-two'>
                        <div className='each-diva'>
                            <label htmlFor="password">Password</label>
                            <input placeholder="password"
                                type={type1}
                                onChange={handleInput}
                                value={userData.password}
                                name="password" />
                            <span className={`show-pass eye `}

                                onClick={handleTogglePassword}
                            >
                                {type1 === "password" ? (
                                    <i className="fa fa-eye-slash" />
                                ) : (
                                    <i className="fa fa-eye" />
                                )}
                            </span>
                        </div>
                        <div className='each-diva'>
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input placeholder="password"
                                type={type2}
                                onChange={handleInput}
                                value={userData.cpassword}
                                name="cpassword" />
                            <span className={`show-pass eye `}

                                onClick={handleTogglePassword1}
                            >
                                {type2 === "password" ? (
                                    <i className="fa fa-eye-slash" />
                                ) : (
                                    <i className="fa fa-eye" />
                                )}
                            </span>

                            {errors.cpassword && <div className="text-danger">{errors.cpassword}</div>}
                        </div>


                    </div>
                    <div className='flex-two'>
                        <div className='each-diva'>
                            <label htmlFor="country">Country</label>
                            <input type="text"
                                onChange={handleInput}
                                value={userData.country}
                                name="country"
                                placeholder="Your Coutry" />

                            {errors.country && <div className="text-danger">{errors.country}</div>}
                        </div>
                        <div className='each-diva'>
                            <label htmlFor="city">City</label>
                            <input type="text"
                                onChange={handleInput}
                                value={userData.city}
                                name="city"
                                placeholder="Your City" />

                            {errors.city && <div className="text-danger">{errors.city}</div>}
                        </div>



                    </div>
                    <div className='flex-two'>
                        <div className='each-diva'>
                            <label htmlFor="address">Address</label>
                            <input type="text"
                                onChange={handleInput}
                                value={userData.address}
                                name="address"
                                placeholder="Your Address" />

                            {errors.address && <div className="text-danger">{errors.address}</div>}
                        </div>
                        <div className='each-diva'>
                            <label htmlFor="postalCode">Postal Code</label>
                            <input type="text"
                                onChange={handleInput}
                                value={userData.postalCode}
                                name="postalCode"
                                placeholder="Your Postal Code" />
                            {errors.postalCode && <div className="text-danger">{errors.postalCode}</div>}

                        </div>



                    </div>
                    <br />
                    <button type="submit" style={{ width: "50%", marginInline: "auto" }} disabled={isloading} className='reg-btn submit-buttons' > {isloading ? (
                        <div className="loader"></div>
                    ) : (
                        'Sign up'
                    )}</button>
                </form>
                <p>Already have an account? <Link className="lofa" to="/auth/login">Login Here</Link></p>
            </section>
        </div>
    );
}

export default Register;
