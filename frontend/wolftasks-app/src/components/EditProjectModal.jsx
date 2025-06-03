import { useState } from 'react';
import api from '../services/api';
import { useProjectReload } from '../contexts/ProjectReloadContext';

const EditProjectModal = ({ project, onClose }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const { setShouldReload } = useProjectReload();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/project/${project.id}`, {
      title,
      description
    });
    setShouldReload(true); // dispara reload
    onClose(); // fecha o modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
  <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-lg">
    <h2 className="text-xl font-bold mb-4">Editar Projeto</h2>
    <form onSubmit={handleSubmit}>
      <label className="block mb-2">Título</label>
      <input
        className="w-full bg-gray-900 text-white border border-gray-600 px-3 py-2 mb-4 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block mb-2">Descrição</label>
      <textarea
        className="w-full bg-gray-900 text-white border border-gray-600 px-3 py-2 mb-4 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default EditProjectModal;
