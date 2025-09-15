import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header.jsx";
import { useState } from "react";
import api from "../../services/api.js";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        setError("");
        if (!email.trim()) {
            setError("Email is required");
            return false;
        }
        if (!password) {
            setError("Password is required");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // 🔹 Exemplo de chamada à API (substitua pela sua)
            const response = await api.post("/api/login", {
                 email, password
            });

            if (response.status === 200) {
                const data = await response.data;
                login(data.user, data.token);
                navigate("/dashboard");
            } else {
                const errorData = await response.data;
                setError(errorData.message || "Invalid login credentials");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
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
                        <h2 className="text-2xl font-bold text-white text-center mb-6">Login to Your Account</h2>

                        {error && (
                            <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
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
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div className="flex flex-col space-y-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50"
                                >
                                    {isLoading ? "Logging in..." : "Enter"}
                                </button>

                                <div className="text-center">
                                    <span className="text-gray-400">Don't have an account?</span>
                                    <Link to="/register" className="ml-2 text-blue-400 hover:text-blue-300 font-medium">
                                        Create Account
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
