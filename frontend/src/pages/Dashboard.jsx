import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

 
  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile/me");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);


  const createTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    await API.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

 
  const updateTask = async (e) => {
    e.preventDefault();
    if (!title || !editingTaskId) return;

    await API.put(`/tasks/${editingTaskId}`, { title, description });
    setTitle("");
    setDescription("");
    setEditingTaskId(null);
    fetchTasks();
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTaskId(task._id);
  };

 
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const filteredTasks = tasks
    .filter((task) => task.title?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen bg-gray-100 p-8">

     
      <div className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Welcome, {user?.username}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

     
      <form
        onSubmit={editingTaskId ? updateTask : createTask}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingTaskId ? "Update Task" : "Create Task"}
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="border p-2 w-full mb-3 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>
      </form>

      
      <input
        placeholder="Search tasks..."
        className="border p-2 mb-6 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => editTask(task)}
                  className="text-green-500 font-semibold hover:text-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 font-semibold hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
