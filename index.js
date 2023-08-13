import express from "express";
import dotenv from "dotenv";
import { DbConnection } from "./config/databaseConnection.js";
import mongoose from "mongoose";

dotenv.config();

DbConnection();

const PORT = process.env.PORT || 4300;

const app = express();

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
