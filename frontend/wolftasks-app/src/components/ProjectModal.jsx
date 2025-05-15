import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api.js';
import { useClickOutside} from '../hooks/useClickOutside';

export default function ProjectModal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const modalRef = useRef(null);

    useClickOutside(modalRef, onClose);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/project', { name });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-300 dark:border-gray-700"
                    >
                        <h2 className="text-2xl font-bold mb-4">Criar Novo Projeto</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nome do Projeto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <div className="flex justify-end space-x-3">
                                <button type="button" onClick={onClose} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow">
                                    Cancelar
                                </button>
                                <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg shadow">
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
