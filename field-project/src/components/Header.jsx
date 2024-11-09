import { NavLink } from 'react-router-dom';
import '../Style/Header.css';
import { loginContextObj } from '../contexts/LoginContext';
import { useContext } from 'react';

function Header() {
    const { currentUser, loginStatus, userLogout } = useContext(loginContextObj)

    return (
        <div className='bg-dark text-white py-4'>
            <ul className="nav justify-content-end fs-4">
                {loginStatus === false ? (
                    <>
                        <li className="nav-item">
                            <NavLink to="" className='nav-link text-white'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="about" className='nav-link text-white'>About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="hostels" className='nav-link text-white'>Hostels</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="register" className='nav-link text-white'>Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="login" className='nav-link text-white'>Login</NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <NavLink to="" className='nav-link text-white'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="hostels" className='nav-link text-white'>Hostels</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="user-profile" className='nav-link text-white'>Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="booking" className='nav-link text-white'>Bookings</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="" onClick={userLogout} className='nav-link text-white'>Logout</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Header;
