import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user
  });
  res.status(201).json(task);
};


export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).json({ message: "Task not found" });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  await task.save();

  res.json(task);
};


export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
