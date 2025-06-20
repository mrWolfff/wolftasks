import { useState, useEffect } from 'react';
import api from '../services/api.js';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';

function DroppableColumn({ id, children, className }) {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div ref={setNodeRef} className={className}>
            {children}
        </div>
    );
}

function DraggableCard({ id, children }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: isDragging ? 10 : 1
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="bg-white text-black rounded p-3 shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-150"
        >
            {children}
        </div>
    );
}

export default function KanbanBoard() {
    const [tasks, setTasks] = useState({
        Backlog: ['Ideia nova', 'Planejamento de sprint'],
        'To-Do': ['Criar layout', 'Configurar ambiente'],
        Doing: ['Desenvolver login'],
        Testing: ['Revisar tarefa X'],
        Finished: ['Setup inicial do projeto']
    });

    const columns = [
        { title: 'Backlog', color: 'bg-gray-800' },
        { title: 'To-Do', color: 'bg-blue-800' },
        { title: 'Doing', color: 'bg-yellow-700' },
        { title: 'Testing', color: 'bg-purple-700' },
        { title: 'Finished', color: 'bg-green-800' }
    ];
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/project');
            setProjects(res.data);
        } catch (err) {
            console.error('Erro ao buscar projetos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const setProject = (project) => {
        setSelectedProject(project);
        searchTasks(project.id);
    };

    const searchTasks = async (projectId) => {
        try {
            const res = await api.get('/task/search/' + projectId);
            setTasks(res.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const sourceColumn = Object.keys(tasks).find((col) => tasks[col].includes(active.id));
        const destColumn = over.id;

        if (!sourceColumn || !destColumn) return;

        setTasks((prev) => {
            const newSource = prev[sourceColumn].filter((task) => task !== active.id);
            const newDest = [...prev[destColumn], active.id];

            return {
                ...prev,
                [sourceColumn]: newSource,
                [destColumn]: newDest
            };
        });
    };

    return (
        <div>
            {!selectedProject ? (
                <div className="space-y-3">
                    <p className="text-sm text-gray-400">Selecione um projeto:</p>
                    <div className="grid grid-cols-1 gap-3">
                        {projects.map((project) => (
                            <button
                                key={project.id}
                                onClick={() => setProject(project)}
                                className="w-full text-left p-4 border rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                            >
                                <strong>{project.title}</strong>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                    <div className="h-screen w-full overflow-x-auto bg-gray-900 text-white">
                        <div className="flex gap-4 min-w-[1000px] p-4">
                            {columns.map((col) => (
                                <DroppableColumn
                                    key={col.title}
                                    id={col.title}
                                    className={`flex flex-col w-64 rounded-lg ${col.color} p-4 shadow`}
                                >
                                    <h2 className="text-lg font-semibold mb-4 text-white">
                                        {col.title}
                                    </h2>

                                    <div className="flex flex-col gap-3">
                                        {tasks[col.title]?.map((task, index) => (
                                            <DraggableCard key={task} id={task}>
                                                {task}
                                            </DraggableCard>
                                        )) || (
                                                <p className="text-sm text-gray-300">Nenhuma tarefa.</p>
                                            )}
                                    </div>
                                </DroppableColumn>
                            ))}
                        </div>
                    </div>
                </DndContext>
            )}
        </div>
    );
}
