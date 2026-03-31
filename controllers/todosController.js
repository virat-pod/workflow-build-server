import Todo from "../models/todo.js";
import User from "../models/user.js";
import { updateTodo } from "../service/todosService.js";
export const addTodos = async (req, res) => {
  const body = req.body;
  try {
    if (!body.content)
      return res
        .status(400)
        .json({ success: false, message: "Content required" });
    const result = await Todo.create({
      content: body.content,
      from_user: body.user,
    });
    return res.status(201).json({ success: true, result });
  } catch (err) {
    console.error("err", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTodos = async (req, res) => {
  const { user } = req.query;

  if (!user)
    return res.status(400).json({ success: false, message: "User required" });

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await Todo.find({
      from_user: user,
      createdAt: { $gte: today },
    });

    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const CompleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Bad request" });
  }
  try {
    const result = await updateTodo(id);
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const EditTodo = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!id || !content) {
    return res.status(400).json({ success: false, message: "Bad request" });
  }

  try {
    const result = await Todo.findByIdAndUpdate(id, { content }, { new: true });
    return res.status(200).json({ success: true, message: "Updated", result });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Bad request" });
  }

  try {
    const result = await Todo.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

export const getRecentTasks = async (req, res) => {
  const { user, limit = 5 } = await req.query;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!user)
    return res.status(400).json({ success: false, message: "Bad request" });

  try {
    const result = await Todo.find({ from_user: user, completed: true })
      .sort({ updatedAt: -1 })
      .limit(Number(limit));
    const todayDoneTasks = await Todo.countDocuments({
      from_user: user,
      completed: true,
      updatedAt: { $gte: today },
    });

    if (!result || result.length == 0)
      return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, message: "Found", result, todayDone: todayDoneTasks });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};
