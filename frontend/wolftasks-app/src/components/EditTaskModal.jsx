import {useState} from 'react';
import api from '../services/api';
import {useProjectReload} from '../contexts/ProjectReloadContext';

export const EditTaskModal = ({task, onClose}) => {
    const [title, setTitle] = useState(task.title == null ? '' : task.title);
    const [description, setDescription] = useState(task.description == null ? '' : task.description);
    const [status, setStatus] = useState(task.status);
    const {setShouldReload} = useProjectReload();
    const statusList = [
        {id: 0, title: 'BACKLOG'},
        {id: 1, title: 'TO_DO'},
        {id: 2, title: 'DOING'},
        {id: 3, title: 'TESTING'},
        {id: 4, title: 'FINISHED'},
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put(`/task/${task.id}`, {
            title,
            description,
            status
        });
        setShouldReload(true);
        onClose();
    }

    const deleteTask = async () => {
        if (confirm("Are you sure?")) {
            await api.delete(`/task/${task.id}`);
            setShouldReload(true);
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <label className={"block mb-2"}>Title</label>
                    <input
                        className={"w-full bg-gray-900 text-white border border-gray-600 px-3 py-2 mb-4 rounded"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className={"block mb-2"}>Description</label>
                    <textarea
                        className={"w-full bg-gray-900 text-white border border-gray-600 px-3 py-2 mb-4 rounded"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className={"block mb-2"}>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}
                            className={"border rounded px-2 py-1"}>
                        {statusList.map((s) => (
                            <option key={s.id} value={s.title}></option>
                        ))}
                    </select>

                    <label className={"block mb-2"}></label>
                    <div className={"flex justify-start space-x-2"}>
                        <button type={"button"}
                                onClick={deleteTask}
                                className={"px-4 py-2 bg-red-600 text-white rounded hover:bg-gray-500"}>
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className={"px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"}
                        >
                            Cancel
                        </button>
                        <button type="submit"
                                className={"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}