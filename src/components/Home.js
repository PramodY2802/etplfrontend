import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    baseURL: 'https://etplbackend.onrender.com/auth',
                    url: 'fetchAll'
                });
                setUsers(response.data);
                setError(null);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'An error occurred');
            }
        };

        fetchAllUsers();
    }, []);

    return (
        <div className="container mt-5">
            <h2>All Users</h2>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {users.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Profile Picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Created At (IST)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <img 
                                        src={user.profileImage || 'default-profile.png'} 
                                        alt={`${user.name}'s profile`} 
                                        className="rounded-circle" 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                                <td>{new Date(user.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
};

export default Home;
