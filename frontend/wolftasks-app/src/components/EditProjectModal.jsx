import { useState } from 'react';
import api from '../services/api';
import { useProjectReload } from '../contexts/ProjectReloadContext';

const EditProjectModal = ({ project, onClose }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);
  const { setShouldReload } = useProjectReload();
  const statusList = [
    { id: 0, title: 'CREATED' },
    { id: 1, title: 'ANALYSING' },
    { id: 2, title: 'ANALYSED' },
    { id: 3, title: 'BLOCKED' },
    { id: 4, title: 'EXECUTING' },
    { id: 5, title: 'FINISHED' },
    { id: 6, title: 'CANCELED' },
    { id: 7, title: 'BACKLOG' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/project/${project.id}`, {
      title,
      description,
      status
    });
    setShouldReload(true); // dispara reload
    onClose(); // fecha o modal
  };

  const deleteProject = async(e) =>{
    if(confirm("Are you sure?")){
    e.preventDefault();
    await api.delete(`/project/${project.id}`);
    setShouldReload(true); // dispara reload
    onClose(); // fecha o modal
  }
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
      <label className="block mb-2">Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-2 py-1">
      {statusList.map((s) => (
        <option key={s.id} value={s.title}>
          {s.title}
        </option>
      ))}
    </select>

    <label className="block mb-2"></label>
    <div className="flex justify-start space-x-2">
    <button
          type="button"
          onClick={deleteProject}

          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-gray-500"
        >Delete Project</button> </div>

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
