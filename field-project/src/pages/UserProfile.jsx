import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginContextObj } from '../contexts/LoginContext';
import '../Style/UserProfile.css';

function UserProfile() {
    const { currentUser, setCurrentUser } = useContext(loginContextObj);
    const [isEdit, setEdit] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser) {
            setValue('username', currentUser.username);
            setValue('email', currentUser.email);
        }
    }, [currentUser, setValue]);

    function onEdit() {
        setEdit(true);
    }

    async function onSave(newObj) {
        setLoading(true);
        newObj.id = currentUser.id;
        try {
            const response = await fetch(`http://localhost:5000/users/${newObj.id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newObj)
            });
            const data = await response.json();
            setCurrentUser(data);
            setEdit(false);
        } catch (err) {
            setError('Failed to update user. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    async function deleteUser(id) {
        setLoading(true);
        try {
            await fetch(`http://localhost:4000/users/${id}`, { method: "DELETE" });
            navigate('/login');
        } catch (err) {
            setError('Failed to delete user. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    if (!currentUser) return <p className="text-center text-warning">User not found.</p>;

    return (
        <div className='user-profile-container container my-5'>
            {error && <p className="text-center text-danger">{error}</p>}
            {loading && <p className="text-center text-info">Processing...</p>}

            {!isEdit ? (
                <div className="profile-view text-center">
                    <h1 className="text-primary">User Profile</h1>
                    <ul className="profile-details list-unstyled fs-5 text-primary">
                        <li><strong>Username:</strong> {currentUser.name}</li>
                        <li><strong>Email:</strong> {currentUser.email}</li>
                    </ul>
                    <button className="btn btn-primary mx-2" onClick={onEdit}>Edit</button>
                    <button className="btn btn-danger mx-2" onClick={() => deleteUser(currentUser.id)}>Delete</button>
                </div>
            ) : (
                <div className="profile-edit w-50 mx-auto bg-light p-4">
                    <h2 className="text-center text-warning">Edit User</h2>
                    <form onSubmit={handleSubmit(onSave)}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" {...register('name')} id="name" className="form-control" required />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" {...register('email')} id="email" className="form-control" required />
                        </div>
                        <button className="btn btn-success mt-4 w-100" type="submit">
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
