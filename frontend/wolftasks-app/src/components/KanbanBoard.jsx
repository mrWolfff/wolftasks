import {useState, useEffect} from 'react';
import api from '../services/api.js';
import {DndContext, closestCenter} from '@dnd-kit/core';
import {useDroppable, useDraggable} from '@dnd-kit/core';
import {EditTaskModal} from "./EditTaskModal.jsx";

function DroppableColumn({id, children, className}) {
    const {setNodeRef} = useDroppable({id});
    return (
        <div ref={setNodeRef} className={className}>
            {children}
        </div>
    );
}

function DraggableCard({ id, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging
    } = useDraggable({ id });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        zIndex: isDragging ? 10 : 1
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes} // atributos de acessibilidade
            className="bg-gray-600 text-white rounded p-3 shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-150"
        >
            {/* Aplica listeners APENAS no conteúdo que deve arrastar */}
            <div {...listeners}>
                {children}
            </div>
        </div>
    );
}

export default function KanbanBoard() {
    const [tasks, setTasks] = useState([]);

    const columns = [
        {title: 'BACKLOG', color: 'bg-gray-800'},
        {title: 'TO_DO', color: 'bg-blue-800'},
        {title: 'DOING', color: 'bg-yellow-700'},
        {title: 'TESTING', color: 'bg-purple-700'},
        {title: 'FINISHED', color: 'bg-green-800'}
    ];
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/project');
            setProjects(res.data);
        } catch (err) {
            console.error('Erro ao buscar projetos:', err);
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

    // Função para atualizar status na API
    const updateTaskStatus = async (task, newStatus) => {
        try {
            await api.put(`/task/${task.id}`, {status: newStatus});
            console.log(`Task ${task.id} atualizada para ${newStatus}`);
        } catch (error) {
            console.error('Erro ao atualizar status da tarefa:', error);
            // Reverter mudança local em caso de erro
            searchTasks(selectedProject.id);
        }
    };

    const handleDragEnd = (event) => {
        const {active, over} = event;

        // Se não há destino válido, cancela
        if (!over) return;

        const taskId = active.id;
        const newStatus = over.id;

        // Encontra a tarefa atual
        const currentTask = tasks.find(task => task.id.toString() === taskId.toString());

        // Se não encontrou a tarefa ou o status é o mesmo, cancela
        if (!currentTask || currentTask.status === newStatus) return;

        // Atualiza o estado local imediatamente para feedback visual rápido
        const updatedTasks = tasks.map(task =>
            task.id.toString() === taskId.toString()
                ? {...task, status: newStatus}
                : task
        );
        setTasks(updatedTasks);

        // Atualiza no backend
        updateTaskStatus(updatedTasks[0], newStatus);
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

                                    <div className="flex flex-col gap-3 min-h-[100px]">
                                        {tasks
                                            .filter(task => task.status === col.title)
                                            .map((task) => (
                                                <DraggableCard
                                                    key={task.id}
                                                    id={task.id.toString()}
                                                >
                                                    <div className="relative">
                                                        {/* Botão fora dos listeners, drag não será ativado aqui */}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedTask(task);
                                                            }}
                                                            className="absolute top-1 right-1 text-white bg-black/40 hover:bg-black/60 rounded-full p-1 z-10"
                                                        >
                                                            🔍
                                                        </button>

                                                        <h3 className="font-medium">{task.title}</h3>
                                                        <p className="text-sm text-gray-300">{task.description}</p>
                                                    </div>
                                                </DraggableCard>
                                            ))}

                                        {tasks.filter(task => task.status === col.title).length === 0 && (
                                            <p className="text-sm text-gray-300">Nenhuma tarefa.</p>
                                        )}
                                    </div>
                                </DroppableColumn>
                            ))}
                        </div>
                    </div>
                </DndContext>
            )}
            {
                selectedTask && (
                    <EditTaskModal
                        task={selectedTask}
                        onClose={() => setSelectedTask(null)}
                    />
                )
            }
        </div>
    )
        ;
}