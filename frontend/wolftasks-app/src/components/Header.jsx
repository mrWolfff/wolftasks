export default function Header({ onOpenTaskModal, onOpenProjectModal, onToggleTheme }) {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 dark:bg-gray-200 dark:text-black shadow-md">
            <h1 className="text-2xl font-bold">🐺 WolfTasks</h1>
            <div className="space-x-2 flex items-center">
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
                <button
                    onClick={onToggleTheme}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded
                               dark:bg-gray-300 dark:text-black dark:hover:bg-gray-400"
                >
                    Alternar Tema
                </button>
            </div>
        </header>
    );
}
