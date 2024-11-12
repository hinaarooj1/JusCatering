import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <section className="hero ">
                <div className="max-width">
                    <h1>About Us</h1>
                    <p>Delivering exquisite culinary experiences to make every event unforgettable.</p>
                </div>
            </section>

            <section className="about-section ">
                <div className="about-content">
                    <div className="max-width">

                        <h2>Welcome to Jus Catering</h2>
                        <p>
                            Where we bring the world’s flavors to your table. Born from a passion for authentic and diverse cuisine, we specialize in creating memorable dining experiences that celebrate the unique tastes, textures, and aromas of international cultures. Whether you're planning an intimate gathering or a large event, we’re here to elevate every occasion with dishes that transport you across continents.
                        </p>

                        <h2>A Culinary Journey Across the Globe</h2>
                        <p>
                            At Jus Catering, we believe in the power of food to connect people. That’s why our menu spans a wide range of global dishes, from the aromatic spices of Indian cuisine to the bold flavors of Latin America, and the rich comfort foods of Europe. Every dish is crafted with the freshest ingredients and an unwavering commitment to quality, ensuring every bite is a journey of discovery.
                        </p>

                        <h2>Our Team of Culinary Storytellers</h2>
                        <p>
                            Our team of talented chefs and culinary experts are not just skilled professionals; they’re storytellers who bring the essence of each country’s cuisine to life. With a deep respect for tradition and a flair for creativity, they work to deliver authentic, flavorful meals that honor each culture's heritage. We take pride in curating menus that cater to diverse tastes and dietary preferences, making sure everyone has a seat at our global table.
                        </p>

                        <h2>Experience the World with Jus Catering</h2>
                        <p>
                            Let Jus Catering handle the details so you can enjoy the experience. With seamless service, our goal is to make your event as flavorful and memorable as possible. Join us, and let’s explore the world through food together.
                        </p>
                    </div>
                </div>
                <div className="about-image">
                    {/* <img src={cateringImage} alt="Catering Event" /> */}
                </div>
            </section>


        </div>
    );
};

export default AboutUs;
