import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api.js';

export default function MyAccount() {
    const { userEmail, login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function fetchUser(userEmail) {
        const user = await api.get(`/api/users/${userEmail}`)
    }

    useEffect(() => {
        if (userEmail) {
            fetchUser(userEmail);
            setName(user.name);
            set
            setEmail(userEmail);
        }
    }, [userEmail]);

    const validateForm = () => {
        setError('');
        
        if (!name.trim()) {
            setError('Name is required');
            return false;
        }
        
        if (!email.trim()) {
            setError('Email is required');
            return false;
        }
        
        if (password && password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        
        if (password && password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        setSuccess('');
        
        try {
            const userData = {
                name,
                email
            };
            
            // Only include password if it was changed
            if (password) {
                userData.password = password;
            }
            
            const response = await api.put(`/api/users/${user.id}`, userData);
            
            if (response.status === 200) {
                // Update the user in context with new data
                const updatedUser = { ...user, name, email };
                login(updatedUser, localStorage.getItem('token'));
                setSuccess('Profile updated successfully');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            setError('Failed to update profile. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 overflow-y-auto h-full">
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">My Account</h2>
                
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}
                
                {success && (
                    <div className="bg-green-500 text-white p-3 rounded mb-4 text-sm">
                        {success}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your email"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            New Password (leave blank to keep current)
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="New password"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm new password"
                        />
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50"
                        >
                            {isLoading ? "Updating..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}