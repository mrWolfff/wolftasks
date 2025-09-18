import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header.jsx";
import { useState } from "react";
import api from "../../services/api.js";

export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        setError("");
        if (!name.trim()) {
            setError("Name is required");
            return false;
        }
        if (!email.trim()) {
            setError("Email is required");
            return false;
        }
        if (!password) {
            setError("Password is required");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        try {
            const response = await api.post("/user/register", {
                name,
                email,
                password,
                bornDate:""
            });

            if (response.status === 201) {
                const data = await response.data;
                login(data.user, data.token);
                navigate("/dashboard");
            } else {
                const errorData = await response.data;
                setError(errorData.message || "Registration failed");
            }
        } catch (err) {
            if(err.status === 409){
                setError(err.response.data.error || "User already exists");
            }else{
                setError("An error occurred. Please try again.");
            }
            console.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Header
                onOpenTaskModal={null}
                onOpenProjectModal={null}
            />
            <div className="flex justify-center items-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-white text-center mb-6">Create an Account</h2>
                        
                        {error && (
                            <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
                                {error}
                            </div>
                        )}
                        
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your full name"
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
                                    placeholder="Enter your email"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Create a password"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirm your password"
                                />
                            </div>
                            
                            <div className="flex flex-col space-y-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50"
                                >
                                    {isLoading ? "Creating Account..." : "Create Account"}
                                </button>
                                
                                <div className="text-center">
                                    <span className="text-gray-400">Already have an account?</span>
                                    <Link to="/login" className="ml-2 text-blue-400 hover:text-blue-300 font-medium">
                                        Log In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}