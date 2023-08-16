import express from "express";
import dotenv from "dotenv";
import { DbConnection } from "./config/databaseConnection.js";
import cors from "cors";
import mongoose from "mongoose";
import { todoRouter } from "./router/todoRoutes.js";
import { userRouter } from "./router/userRouter.js";
import { authRouter } from "./router/authRouter.js";
import { refreshRouter } from "./router/refreshRouter.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsConfig.js";

dotenv.config();

DbConnection();

const PORT = process.env.PORT || 4300;

const app = express();

// middleware to process cors requests
app.use(cors(corsOptions));
// middleware to process form data
app.use(express.urlencoded({ extended: false }));
// middleware to process json content
app.use(express.json());
// middleware to parse cookies
app.use(cookieParser());

// configure routes
app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/refresh", refreshRouter);

mongoose.connection.once("open", (err) => {
	if (err) {
		console.log("Error connecting to the database");
		process.exit(1);
	}
	console.log("Connected to MongoDB!");
	app.listen(PORT, (err) => {
		if (err) {
			console.error("Error listening to port.");
		}
		console.log("Listening on Port " + PORT);
	});
});
