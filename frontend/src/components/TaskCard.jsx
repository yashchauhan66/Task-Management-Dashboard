export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded p-4 m-2 flex justify-between items-center">
      <div>
        <h2 className="font-bold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div className="space-x-2">
        <button onClick={() => onEdit(task)} className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
        <button onClick={() => onDelete(task._id)} className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white">Delete</button>
      </div>
    </div>
  );
}
