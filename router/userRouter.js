import express from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
} from "../controllers/userController.js";
const userRouter = express.Router();

// Todo - only the admin should have get and delete accesses.
userRouter.route("/").get(getAllUsers).post(createUser).delete(deleteUser);

export { userRouter };
