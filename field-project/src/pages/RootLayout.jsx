import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import '../Style/RootLayout.css';

function RootLayout({ isLoggedIn, onLogout }) {
    return (
        <div className="root-layout">
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default RootLayout;
