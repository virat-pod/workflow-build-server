import express from "express";
import {
  addTodos,
  getTodos,
  CompleteTask,
  EditTodo,
  deleteTask,
  getRecentTasks
} from "../controllers/todosController.js";

const router = express.Router();

router.get("/", getTodos);

router.get("/recent", getRecentTasks)

router.post("/", addTodos);

router.patch("/:id/complete", CompleteTask);

router.patch("/:id/edit", EditTodo);

router.delete("/:id", deleteTask);

export default router;
