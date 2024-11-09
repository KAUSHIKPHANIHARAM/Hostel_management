import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/About.css';

function About() {
    return (
        <div className="container about-container">
            <h2 className="about-title">About Our Management</h2>
            <p className="about-description">
                Dorm Quest is your one-stop solution for finding and booking the perfect hostel with ease. Our platform allows you to explore hostels near your location, view room availability and sharing options, check detailed room layouts, and get a clear route map to each hostel. With an easy-to-use interface, you can book your room online and receive instant notifications, making your hostel search and reservation process seamless and efficient.
            </p>
            <div className="about-features">
                <strong>Key Features:</strong>
                <ul>
                    <li>Comprehensive hostel listings with locality filters</li>
                    <li>Room availability and sharing options</li>
                    <li>Detailed room blueprints and amenities</li>
                    <li>Route maps to guide you to the hostel</li>
                    <li>Instant booking with confirmation notifications</li>
                </ul>
            </div>
        </div>
    );
}

export default About;
