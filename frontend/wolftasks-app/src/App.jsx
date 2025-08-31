import './App.css'
import Home from "./pages/Home.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ProjectReloadProvider} from './contexts/ProjectReloadContext.jsx';
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import Login from "./components/user/Login.jsx";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={
                            <PrivateRoute>
                                <ProjectReloadProvider>
                                    <Home/>
                                </ProjectReloadProvider>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>


    );
}
