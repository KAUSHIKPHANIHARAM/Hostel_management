import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../Style/HostelDetails.css';
import { loginContextObj } from '../contexts/LoginContext';

function HostelDetails() {
    const { id } = useParams();
    const { state } = useLocation();
    const { hostelUrl } = state || {};
    const navigate = useNavigate();
    const [hostel, setHostel] = useState(null);

    const { loginStatus } = useContext(loginContextObj);

    useEffect(() => {
        const fetchHostelDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/hostels/${id}`);
                const data = await response.json();
                setHostel(data);
            } catch (error) {
                console.error('Error fetching hostel details:', error);
            }
        };
        fetchHostelDetails();
    }, [id]);

    const handleBooking = () => {
        if (loginStatus) {
            navigate('/booking', { state: { hostelId: id, hostelName: hostel.name, pricePerNight: hostel.pricePerNight } });
        } else {
            navigate('/login', { state: { from: `/hostels/${id}` } });
        }
    };

    if (!hostel) {
        return <div className="text-center mt-5">Loading hostel details...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={hostelUrl || hostel.image} alt={hostel.name} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-6">
                    <h2 className="text-primary">{hostel.name}</h2>
                    <p className="text-muted">{hostel.description}</p>
                    <p><strong>Address:</strong> {hostel.address}</p>
                    <p><strong>Room Types:</strong> {hostel.roomTypes.join(', ')}</p>
                    <p><strong>Amenities:</strong> {hostel.amenities.join(', ')}</p>
                    <p><strong>Price per Night:</strong> ${hostel.pricePerNight}</p>
                    <button onClick={handleBooking} className="btn btn-success me-3">Book Now</button>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${hostel.location.latitude},${hostel.location.longitude}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get Directions</a>
                </div>
            </div>

            <div className="row mt-5">
                <h3 className="text-center">Location</h3>
                <MapContainer center={[hostel.location.latitude, hostel.location.longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    <Marker position={[hostel.location.latitude, hostel.location.longitude]}>
                        <Popup>{hostel.name}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}

export default HostelDetails;
