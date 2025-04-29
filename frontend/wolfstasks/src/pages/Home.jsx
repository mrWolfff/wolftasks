import { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import TaskModal from '../components/TaskModal';
import ProjectModal from '../components/ProjectModal';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [projectModalOpen, setProjectModalOpen] = useState(false);

    const fetchTasks = async () => {
        const res = await api.get('/task');
        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header
                onOpenTaskModal={() => setTaskModalOpen(true)}
                onOpenProjectModal={() => setProjectModalOpen(true)}
            />

            <main className="p-6 grid gap-4">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task.id} className="p-4 bg-gray-800 rounded shadow">
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma task encontrada.</p>
                )}
            </main>

            <TaskModal isOpen={taskModalOpen} onClose={() => {
                setTaskModalOpen(false);
                fetchTasks(); // Refresh tasks after closing
            }} />

            <ProjectModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
        </div>
    );
}
