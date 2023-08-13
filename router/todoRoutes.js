import express from "express";
import {
	createNewTodo,
	deleteTodo,
	editTodo,
	getAllTodos,
} from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter
	.route("/")
	.get(getAllTodos)
	.post(createNewTodo)
	.put(editTodo)
	.delete(deleteTodo);

export { todoRouter };
