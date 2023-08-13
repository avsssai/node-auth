import express from "express";
import dotenv from "dotenv";
import { DbConnection } from "./config/databaseConnection.js";
import cors from "cors";
import mongoose from "mongoose";
import { todoRouter } from "./router/todoRoutes.js";

dotenv.config();

DbConnection();

const PORT = process.env.PORT || 4300;

const app = express();

// middleware to process cors requests
app.use(cors());
// middleware to process form data
app.use(express.urlencoded({ extended: false }));
// middleware to process json content
app.use(express.json());

// configure routes
app.use("/api/todos", todoRouter);

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
