import express from "express";
import {
	createNewTodo,
	deleteTodo,
	editTodo,
	getAllTodos,
} from "../controllers/todoController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { verifyRoles } from "../middleware/verifyRoles.js";
import { USER_ROLES } from "../config/userRoles.js";

const todoRouter = express.Router();

todoRouter
	.route("/")
	.get(verifyJWT, verifyRoles(USER_ROLES.User), getAllTodos)
	.post(
		verifyJWT,
		verifyRoles(USER_ROLES.User, USER_ROLES.Editor),
		createNewTodo
	)
	.put(verifyJWT, verifyRoles(USER_ROLES.User, USER_ROLES.Editor), editTodo)
	.delete(verifyJWT, verifyRoles(USER_ROLES.Admin), deleteTodo);

export { todoRouter };
