import {useState, useEffect} from 'react';
import api from '../services/api.js';
import Header from '../components/Header.jsx';
import TaskModal from '../components/TaskModal.jsx';
import ProjectModal from '../components/ProjectModal.jsx';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Busca o tema atual ao montar o componente
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const isDarkMode = savedTheme === 'dark';
        setDarkMode(isDarkMode);

        // Aplique a classe ao HTML com base no tema salvo
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // Atualiza a classe no HTML e salva a preferência quando o darkMode muda
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        console.log("Dark mode is:", darkMode);
    }, [darkMode]);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/task');
            setTasks(res.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Função para alternar o modo escuro
    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <div className="min-h-screen w-full bg-black shadow-lg md:shadow-2xl">
            <Header
                onOpenTaskModal={() => setTaskModalOpen(true)}
                onOpenProjectModal={() => setProjectModalOpen(true)}
                onToggleTheme={toggleDarkMode}
                darkMode={darkMode}
            />

            {/* Conteúdo principal */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <aside className="w-1/5 bg-gray-800 text-black dark:text-white p-4 min-h-screen shadow-lg md:shadow-2xl">
                    <ul className="space-y-4">
                        {['Dashboard', 'Projects', 'Tasks'].map(item => (
                            <li
                                key={item}
                                className="p-2 rounded cursor-pointer transition-colors duration-300
                                           bg-white dark:bg-gray-800 text-black dark:text-white
                                           hover:bg-blue-100 dark:hover:bg-blue-700"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="w-4/5 p-6 bg-white dark:bg-black text-black dark:text-white">
                    {tasks.length > 0 ? (
                        <div className="grid gap-4">
                            {tasks.map(task => (
                                <div
                                    key={task.id}
                                    className="p-4 bg-gray-50 dark:bg-gray-800 text-black dark:text-white rounded shadow-md
                                               hover:shadow-lg transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold">{task.title}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-black dark:text-white">Nenhuma task encontrada.</p>
                    )}
                </main>
            </div>

            {/* Modais */}
            <TaskModal
                isOpen={taskModalOpen}
                onClose={() => {
                    setTaskModalOpen(false);
                    fetchTasks();
                }}
            />
            <ProjectModal
                isOpen={projectModalOpen}
                onClose={() => setProjectModalOpen(false)}
            />
        </div>
    );
}