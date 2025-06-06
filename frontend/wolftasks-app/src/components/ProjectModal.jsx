import { useState, useEffect, useRef } from 'react';
import api from '../services/api.js';
import UserSelectModal from './UserSelectModal';
import { useClickOutside } from '../hooks/useClickOutside';
import { useProjectReload } from '../contexts/ProjectReloadContext.jsx';
import ModalWrapper from './ModalWrapper.jsx';

export default function ProjectModal({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [creatorId, setCreatorId] = useState(null);
    const [responsibleId, setResponsibleId] = useState(null);
    const [showCreatorModal, setShowCreatorModal] = useState(false);
    const [showResponsibleModal, setShowResponsibleModal] = useState(false);
    const [users, setUsers] = useState([]);
    const { setShouldReload } = useProjectReload();

    const modalRef = useRef(null);
    useClickOutside(modalRef, onClose);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/project', {
            title,
            description,
            creatorId: creatorId?.id,
            responsibleId: responsibleId?.id
        });
        setShouldReload(true);
        onClose();
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <div ref={modalRef}>
                <h2 className="text-2xl font-bold mb-4">Criar Novo Projeto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Título do Projeto"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg shadow"
                        >
                            Salvar
                        </button>
                    </div>
                </form>

                <UserSelectModal
                    isOpen={showCreatorModal}
                    onClose={() => setShowCreatorModal(false)}
                    onSelect={(user) => {
                        setCreatorId(user);
                        setShowCreatorModal(false);
                    }} />
                <UserSelectModal
                    isOpen={showResponsibleModal}
                    onClose={() => setShowResponsibleModal(false)}
                    onSelect={(user) => setResponsibleId(user)} />
            </div>
        </ModalWrapper >
    );
}
