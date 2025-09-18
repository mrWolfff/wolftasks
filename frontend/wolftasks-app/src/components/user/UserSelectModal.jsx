import { useClickOutside } from '../../hooks/useClickOutside';
import { useEffect, useRef, useState } from 'react';
import {  AnimatePresence, motion } from 'framer-motion';
import api from '../../services/api';

export default function UserSelectModal({ isOpen, onClose, onSelect }) {
    const [users, setUsers] = useState([]);
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

        if (isOpen) fetchUsers();
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        ref={modalRef}
                        className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl w-full max-w-md border border-gray-300 dark:border-gray-700 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3 className="text-xl font-bold mb-4">Selecionar Usuário</h3>
                        <ul className="space-y-2 max-h-64 overflow-y-auto">
                            {users.map(user => (
                                <li
                                    key={user.id}
                                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                                    onClick={() => {
                                        onSelect(user);
                                        onClose();
                                    }}
                                >
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
