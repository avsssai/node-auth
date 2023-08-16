import express from "express";
import { authenticateUser } from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.route("/").post(authenticateUser);

export { authRouter };
