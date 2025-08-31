import {useAuth} from "../contexts/AuthContext.jsx";

export default function Header({ onOpenTaskModal, onOpenProjectModal }) {
    const { user } = useAuth();

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-gray-800 border-b border-gray-700 shadow">
            <h1 className="text-2xl font-bold text-white">🐺 WolfTasks</h1>
            {user && (
            <div className="flex space-x-3">
                <button
                    onClick={onOpenTaskModal}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
                >
                    Nova Task
                </button>
                <button
                    onClick={onOpenProjectModal}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white"
                >
                    Novo Projeto
                </button>
            </div>
            )}
        </header>
    );
}
