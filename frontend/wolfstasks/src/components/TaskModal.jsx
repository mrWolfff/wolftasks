import { useState } from 'react';
import api from '../services/api';

export default function TaskModal({ isOpen, onClose }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/task', { title });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg space-y-4">
                <h2 className="text-xl mb-4">Criar Nova Task</h2>
                <input
                    type="text"
                    placeholder="Título da Task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />
                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-red-600 rounded">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 rounded">Salvar</button>
                </div>
            </form>
        </div>
    );
}
