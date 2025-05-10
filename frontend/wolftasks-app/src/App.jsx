import './App.css'
import Home from "./pages/Home.jsx";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        // Verifica se o usuário prefere tema escuro no sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Verifica se há um tema salvo no localStorage
        const savedTheme = localStorage.getItem('theme');

        // Se houver um tema salvo, use-o. Caso contrário, use a preferência do sistema
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, []);
    return (
        <div className="dark">
            <Home />
        </div>
    );
}

export default App;
