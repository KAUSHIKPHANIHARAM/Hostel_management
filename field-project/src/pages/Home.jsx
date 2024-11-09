import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/Home.css';

function Home() {
    return (
        <div className="container-fluid main-content">
            <div className="row justify-content-center text-center">
                <div className="col-lg-8 col-md-10 mt-5">
                    <h2 className="display-4 text-primary">Welcome to Hostel Finder</h2>
                    <p className="lead text-secondary mt-3">Discover and book the best hostels near you with ease!</p>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-lg-8 col-md-10">
                    <img
                        src="https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9zdGVsfGVufDB8fDB8fHww"
                        alt="Hostel preview"
                        className="img-fluid rounded shadow image-zoom"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
