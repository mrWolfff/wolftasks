import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header.jsx";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        // 🔹 Exemplo de chamada à API (substitua pela sua)
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "lucas", password: "123" })
        });

        if (response.ok) {
            const data = await response.json();

            // supondo que a API retorna: { user: {...}, token: "jwt123" }
            login(data.user, data.token);
            navigate("/dashboard");
        } else {
            alert("Login inválido");
        }
    };

    return (
        <div>
            <Header
            onOpenTaskModal={null}
            onOpenProjectModal={null}
            />
            <h2 className={"text-white"}>Login</h2>
            <button className={"text-white"} onClick={handleLogin}>Enter</button>
        </div>
    );
}
