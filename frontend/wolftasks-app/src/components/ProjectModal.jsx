import { useState } from 'react';
import api from '../services/api.js';

export default function ProjectModal({ isOpen, onClose }) {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/project', { name });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg space-y-4">
                <h2 className="text-xl mb-4">Criar Novo Projeto</h2>
                <input
                    type="text"
                    placeholder="Nome do Projeto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-red-600 rounded">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-green-600 rounded">Salvar</button>
                </div>
            </form>
        </div>
    );
}
