export default function Header({ onOpenTaskModal, onOpenProjectModal }) {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800">
            <h1 className="text-2xl font-bold">🐺 WolfTasks</h1>
            <div className="space-x-2">
                <button onClick={onOpenTaskModal} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Nova Task</button>
                <button onClick={onOpenProjectModal} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">Novo Projeto</button>
            </div>
        </header>
    );
}
