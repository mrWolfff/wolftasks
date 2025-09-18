import {useState, useEffect} from 'react';
import api from '../services/api.js';
import Header from '../components/Header.jsx';
import KanbanBoard from "../components/KanbanBoard.jsx";
import TaskModal from '../components/task/TaskModal.jsx';
import ProjectModal from '../components/project/ProjectModal.jsx';
import ProjectList from "../components/project/ProjectList.jsx";
import MyAccount from "../components/user/MyAccount.jsx";
import { useAuth } from '../contexts/AuthContext.jsx';
import { useProjectReload } from '../contexts/ProjectReloadContext.jsx';

export default function Home() {
    const { logout } = useAuth();
    const { shouldReload } = useProjectReload();
    const [tasks, setTasks] = useState([]);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/task');
            setTasks(res.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };
    useEffect(() => {
        fetchProjects();
        if (activeTab === 'Tasks') {
            fetchTasks();
        }
    }, [activeTab, shouldReload]);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/project', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProjects(res.data);
        } catch (err) {
            console.error('Erro ao buscar projetos:', err);
        }
    };

    return (
        <div className="flex w-full h-full min-h-screen h-screen bg-gray-900 text-white">
            <aside className="w-60 bg-gray-800 p-4 flex flex-col border-r border-gray-700">
                <h2 className="text-xl font-semibold mb-6">Menu</h2>
                <nav className="flex flex-col space-y-3">
                    {['Dashboard', 'Projects', 'Tasks'].map(item => (
                        <div key={item}>
                            <button
                                onClick={() => setActiveTab(item)}
                                className={`w-full text-left px-3 py-2 rounded transition 
                ${activeTab === item ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
                            >
                                {item}
                            </button>
                            {item === 'Dashboard'  && projects?.length > 0 && (
                                <div className="ml-4 mt-2 flex flex-col space-y-2">
                                    {projects.map((project) => (
                                        <button
                                            key={project.id}
                                            onClick={() => {
                                                setSelectedProject(project);
                                                setActiveTab('Dashboard');
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition
                      ${selectedProject?.id === project.id ? 'bg-blue-700 font-semibold' : 'hover:bg-gray-600'}`}>
                                            {project.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* My Account and Logout options */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <button
                            onClick={() => {
                                setActiveTab('MyAccount');
                                setSelectedProject(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded transition 
                            ${activeTab === 'MyAccount' ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
                        >
                            My Account
                        </button>

                        <button
                            onClick={() => logout()}
                            className="w-full text-left px-3 py-2 rounded transition text-red-400 hover:bg-gray-700 mt-2"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>
            <div className="flex-1 flex flex-col">
                <Header
                    onOpenTaskModal={() => setTaskModalOpen(true)}
                    onOpenProjectModal={() => setProjectModalOpen(true)}
                />

                <div className="bg-gray-850 border-b border-gray-700 px-6 py-3 text-sm text-gray-300">
                    Your work / <span className="text-white">{activeTab}</span>
                    {selectedProject && activeTab === 'Dashboard' && (
                        <> / <span className="text-blue-400">{selectedProject.title}</span></>
                    )}
                </div>

                <main className="flex-1 overflow-hidden">
                    {selectedProject && activeTab === 'Dashboard' && (
                        <KanbanBoard project={selectedProject} />
                    )}
                    {activeTab === 'Projects' && <ProjectList />}
                    {activeTab === 'Tasks' && (
                        <div className="p-6 overflow-y-auto h-full">
                            {tasks.length > 0 ? (
                                <div className="grid gap-4">
                                    {tasks.map(task => (
                                        <div
                                            key={task.id}
                                            className="p-4 bg-gray-800 rounded shadow hover:shadow-lg transition-all"
                                        >
                                            <h3 className="text-lg font-semibold">{task.title}</h3>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">Nenhuma task encontrada.</p>
                            )}
                        </div>
                    )}
                    {activeTab === 'MyAccount' && <MyAccount />}
                </main>
            </div>

            <TaskModal
                isOpen={taskModalOpen}
                onClose={() => {
                    setTaskModalOpen(false);
                    fetchTasks();
                }}
                selectedProject={selectedProject}
            />
            <ProjectModal
                isOpen={projectModalOpen}
                onClose={() => setProjectModalOpen(false)}
            />
        </div>
    );
}
