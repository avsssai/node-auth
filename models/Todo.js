import mongoose from "mongoose";

const Todo = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		required: true,
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	updatedDate: Date,
});

export const TodoModel = mongoose.model("Todo", Todo);
