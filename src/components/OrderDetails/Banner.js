import React, { useState } from 'react';
import './Banner.css';
// menuData.js
import Appetizer from '../../assets/img/appetizer.avif'
import Salad from '../../assets/img/salad.jpg'
import MainMeat from '../../assets/img/main-meats.jpg'
import Vegitables from '../../assets/img/vegetables.jpg'
import Sides from '../../assets/img/sides.jpg'
import Vegan from '../../assets/img/vegan.jpg'
import Vegetarian from '../../assets/img/Vegetarian.jpg'
import Breads from '../../assets/img/bread.jpg'
import Pastries from '../../assets/img/Pastries.jpg'
import Breakfast from '../../assets/img/breakfast.jpg'
import { useAuthUser } from 'react-auth-kit';
import { toast } from 'react-toastify';
import { submitOrderApi } from '../../Api/Service';
export const menuData = [
    { id: 1, category: 'Appetizers', image: Appetizer },
    { id: 2, category: 'Salads', image: Salad },
    { id: 3, category: 'Main Meats', image: MainMeat },
    { id: 4, category: 'Vegetables', image: Vegitables },
    { id: 5, category: 'Breakfast', image: Breakfast },
    { id: 6, category: 'Sides', image: Sides },
    { id: 7, category: 'Vegan', image: Vegan },
    { id: 8, category: 'Vegetarian', image: Vegetarian },
    { id: 9, category: 'Breads', image: Breads },
    { id: 10, category: 'Pastries', image: Pastries },
];

const CuisinePage = ({ cuisineName }) => {

    let authUser = useAuthUser();
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [isloading, setisloading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [numGuests, setNumGuests] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState(authUser().user.phone);
    const [name, setName] = useState(authUser().user.firstName + " " + authUser().user.lastName);
    const [email, setEmail] = useState(authUser().user.email);
    const [errors, setErrors] = useState({
        phoneNumber: '',
        email: '',
        name: '',
        numGuests: '',
        selectedDate: '',
    });

    // State to track selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        if (!selectedCategories || selectedCategories === null || selectedCategories <= 0) {
            toast.error("Please select at least one menu category")
        }
        if (!phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
            isValid = false;
        }

        if (!name) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        }

        if (!numGuests || numGuests < 1) {
            newErrors.numGuests = 'Number of guests must be at least 1';
            isValid = false;
        }

        if (!selectedDate) {
            newErrors.selectedDate = 'Please select a date';
            isValid = false;
        } else {
            // Optionally, check if the selected date is in the future (if required)
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            if (selectedDate < today) {
                newErrors.selectedDate = 'Please select a valid future date';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle checkbox change
    const handleCheckboxChange = (category) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category]
        );
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {

            try {

                setisloading(true)
                const formData = {
                    name: authUser().user.firstName + " " + authUser().user.lastName,
                    selectedCategories,
                    additionalNotes,
                    selectedDate,
                    numGuests,
                    phoneNumber,
                    email,
                };


                const submittedMessage = await submitOrderApi(formData);
                if (submittedMessage.success) {

                    toast.info(submittedMessage.msg);

                } else {

                    toast.error(submittedMessage.msg);
                }
                console.log("Submitted Data:", formData);

                // Clear form
                // setSelectedCategories([]);
                // setAdditionalNotes('');
                // setSelectedDate('');
                // setNumGuests(1);
                // setPhoneNumber('');
                // setEmail('');
            } catch (error) {

                toast.error(error?.data?.msg || error?.message || "Something went wrong");

            }
            finally {
                setisloading(false);
            }
        }
    };
    const toggleCategorySelection = (category) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category]
        );
    };
    return (
        <div className="cuisine-page">
            <h1>{cuisineName} Cuisine Menu</h1>
            <div className="menu-grid">
                {menuData.map((item) => (
                    <div
                        key={item.id}
                        className={`menu-category ${selectedCategories.includes(item.category) ? 'selected' : ''}`}
                        onClick={() => toggleCategorySelection(item.category)}
                    >
                        <div className="img-area">
                            <img src={item.image} alt={item.category} className="category-image" />
                        </div>
                        <h2 className="category-title">{item.category}</h2>
                        <label> {selectedCategories.includes(item.category) ? <i className="fa-solid fa-check"></i> : ""} Select {item.category}</label>
                    </div>
                ))}
            </div>
            {/* Additional Form Fields */}
            <div className="form-fields">
                <label>
                    Name:
                    <input
                        type="email"

                        value={authUser().user.firstName + " " + authUser().user.lastName}
                        readOnly
                        style={{ opacity: "0.5" }}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your name"
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}

                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={authUser().user.email}
                        readOnly
                        style={{ opacity: "0.5" }}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />

                    {errors.email && <div className="error-message">{errors.email}</div>}
                </label>

                <label>
                    Phone Number:
                    <input
                        type="tel"
                        value={phoneNumber}

                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                </label>


                <label>
                    Number of Guests:
                    <input
                        type="number"
                        min="1"
                        value={numGuests}
                        onChange={(e) => setNumGuests(e.target.value)}
                    />
                    {errors.numGuests && <div className="error-message">{errors.numGuests}</div>}
                </label>
                <label>
                    Select Date:
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    {errors.selectedDate && <div className="error-message">{errors.selectedDate}</div>}
                </label>
                <label>
                    Additional Notes:
                    <textarea
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        rows={4} cols={40}
                        placeholder="Enter any additional notes here"
                    />
                </label>




            </div>

            <button disabled={isloading} type="submit" onClick={handleSubmit} className='isal submit-button submit-buttons'> {isloading ? (
                <div className="loader"></div>
            ) : (
                'Submit'
            )}</button>

        </div>
    );
};

export default CuisinePage;
