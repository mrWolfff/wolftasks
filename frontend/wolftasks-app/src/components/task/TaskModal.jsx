import { useState, useRef, useEffect } from 'react';
import api from '../../services/api.js';
import UserSelectModal from '../user/UserSelectModal';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useProjectReload } from '../../contexts/ProjectReloadContext.jsx';
import ModalWrapper from '../general/ModalWrapper.jsx';
import Toast from '../general/Toast.jsx';

export default function TaskModal({ isOpen, onClose, selectedProject }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [creatorId, setCreatorId] = useState(null);
    const [responsibleId, setResponsibleId] = useState(null);
    const [showCreatorModal, setShowCreatorModal] = useState(false);
    const [showResponsibleModal, setShowResponsibleModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [setSelectedProject] = useState(null);
    const modalRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [toast, setToast] = useState(null);

    useClickOutside(modalRef, onClose);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProject) return;

        try {
            await api.post('/task', {
                title,
                description,
                projectId: selectedProject.id,
                creatorId: creatorId?.id,
                responsibleId: responsibleId?.id
            });
            setToast({ message: 'Tarefa criada com sucesso!', type: 'success' });
            onClose();
        } catch (error) {
            setToast({
                message: error?.response?.data?.message || 'Erro ao criar tarefa.',
                type: 'error'
            });
        }
    };

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
        const fetchUsers = async () => {
            try {
                const res = await api.get('/user');
                setUsers(res.data);
            } catch (err) {
                console.error('Erro ao buscar usuários:', err);
            }
        };

        if (isOpen) {
            fetchUsers();
            setTitle('');
            setDescription('');
            setCreatorId('');
            setResponsibleId('');
        }
    }, [isOpen]);

    useEffect(() => {
        fetchProjects();
    }, []);

    return (

        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <div ref={modalRef}>
                <h2 className="text-2xl font-bold mb-4">Criar Nova Task</h2>

                {!selectedProject ? (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-400">Selecione um projeto:</p>
                        <div className="grid grid-cols-1 gap-3">
                            {projects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => setSelectedProject(project)}
                                    className="w-full text-left p-4 border rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                                >
                                    <strong>{project.title}</strong>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Projeto selecionado: <strong>{selectedProject.title}</strong>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedProject(null)}
                                className="text-xs text-blue-500 underline"
                            >
                                Trocar projeto
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Título da Task"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <textarea
                            className="w-full rounded-lg bg-gray-900 text-white border border-gray-600 px-3 py-2 mb-4 rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="relative">
                            <label className="block mb-1">Criador</label>
                            <div className="flex">
                                <input
                                    readOnly
                                    value={creatorId?.name || ''}
                                    placeholder="Selecionar Criador"
                                    className="w-full p-3 rounded-l-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCreatorModal(true)}
                                    className="p-3 rounded-r-lg bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                                >
                                    🔍
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block mb-1">Responsável</label>
                            <div className="flex">
                                <input
                                    readOnly
                                    value={responsibleId?.name || ''}
                                    placeholder="Selecionar Responsável"
                                    className="w-full p-3 rounded-l-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowResponsibleModal(true)}
                                    className="p-3 rounded-r-lg bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                                >
                                    🔍
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                )}

                <UserSelectModal
                    isOpen={showCreatorModal}
                    onClose={() => setShowCreatorModal(false)}
                    onSelect={(user) => {
                        setCreatorId(user);
                        setShowCreatorModal(false);
                    }}
                />
                <UserSelectModal
                    isOpen={showResponsibleModal}
                    onClose={() => setShowResponsibleModal(false)}
                    onSelect={(user) => setResponsibleId(user)}
                />
            </div>
        </ModalWrapper>
    );
}
