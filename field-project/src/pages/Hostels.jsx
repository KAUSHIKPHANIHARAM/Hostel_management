import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/Hostels.css';

function Hostels() {
    const [hostels, setHostels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHostels = async () => {
            try {
                const response = await fetch('http://localhost:4000/hostels');
                const data = await response.json();
                setHostels(data);
            } catch (error) {
                console.error('Error fetching hostels:', error);
            }
        };

        fetchHostels();
    }, []);

    const handleViewDetails = (hostel) => {
        navigate(`/hostels/${hostel.id}`, { state: { hostelUrl: hostel.image } });
    };

    return (
        <div className="container main-content">
            <h2 className="text-center my-5">Available Hostels</h2>
            <div className="row">
                {hostels.map((hostel) => (
                    <div key={hostel.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card hostel-card shadow-sm">
                            <img src={hostel.image} alt={hostel.name} className="card-img-top hostel-img" />
                            <div className="card-body">
                                <h5 className="card-title text-primary">{hostel.name}</h5>
                                <p className="card-text text-muted">{hostel.description}</p>
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={() => handleViewDetails(hostel)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hostels;