import React, { useState } from 'react';
import './Contact.css'
import { submitMessageApi } from '../../Api/Service'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Contact = () => {
    let navigate = useNavigate()

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isloading, setisloading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [message, setMessage] = useState('');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Validation error states
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({
            name: '',
            email: '',
            phoneNumber: '',
            message: ''
        });

        let valid = true;
        const newErrors = {};

        // Name validation
        if (!name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        // Email validation
        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            valid = false;
        }

        // Phone number validation
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
            valid = false;
        }

        // Message validation
        if (!message.trim()) {
            newErrors.message = 'Message is required';
            valid = false;
        }

        // If form is not valid, set errors and stop submission
        if (!valid) {
            setErrors(newErrors);
            return;
        }
        try {
            setisloading(true)
            const formData = {
                name: name,
                email: email,
                phone: phoneNumber,
                message: message,

            };


            const submittedMessage = await submitMessageApi(formData);
            if (submittedMessage.success) {

                toast.info(submittedMessage.msg);
                setFormSubmitted(true);

            } else {

                toast.error(submittedMessage.msg);
            }

        } catch (error) {
            toast.error(error?.data?.msg || error?.message || "Something went wrong");


        } finally {
            setisloading(false);


        }

        // Reset form fields if necessary

    };
    if (formSubmitted) {
        return (
            <div className="success-message">
                <h2>Your message has been successfully submitted!</h2>
                <p>Thank you for reaching out. We’ve received your message and will get back to you as soon as possible.</p>
                <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
        );
    }
    return (
        <div className="contact-us">
            <section className="contact-hero">
                <h1>Contact Us</h1>
                <p>We're here to help you make your event unforgettable. Reach out to us today!</p>
            </section>

            <section className="contact-form-section">
                <h2>Send Us a Message</h2>
                <form className="contact-form lea" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        name="name"
                    />
                    {errors.name && <p className="text-danger txtp fs-12" style={{ marginTop: "0" }}>{errors.name}</p>}

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                    />
                    {errors.email && <p className="text-danger txtp fs-12" style={{ marginTop: "0" }}>{errors.email}</p>}

                    <label htmlFor="phone">Phone</label>
                    <input
                        type="phone"
                        id="phone"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && <p className="text-danger txtp fs-12" style={{ marginTop: "0" }}>{errors.phoneNumber}</p>}

                    <label htmlFor="message">Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here"
                        id="message"
                        name="message"
                        rows="5"
                        style={{ marginBottom: 0 }}
                    />
                    {errors.message && <p className="text-danger txtp fs-12" style={{ margin: "0" }}>{errors.message}</p>}
                    <br />

                    <button disabled={isloading} type="submit" className='isal submit-button submit-buttons'> {isloading ? (
                        <div className="loader"></div>
                    ) : (
                        'Submit'
                    )}</button>
                </form>
            </section>
        </div>
    );
}

export default Contact;
