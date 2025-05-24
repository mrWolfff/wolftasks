import { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Projetos</h2>

            {loading ? (
                <p className="text-gray-300">Carregando projetos...</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-gray-800 rounded-lg p-4 border border-gray-700 shadow hover:shadow-lg transition-shadow"
                        >
                            <div className="mb-2">
                                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                <p className="text-gray-400 text-sm">{project.description}</p>
                            </div>
                            <div className="text-sm text-gray-300">
                                <p>Status: <span className="font-medium text-white">{project.status}</span></p>
                                <p>Data de criação: {project.creationDate}</p>
                                <p>Finalizado: {project.finished ? 'Sim' : 'Não'}</p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white"
                                    onClick={() => alert(`Editar projeto: ${project.title}`)}
                                >
                                    ✏️ Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
