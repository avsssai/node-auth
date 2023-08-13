import { TodoModel } from "../models/Todo.js";

export const getAllTodos = async (req, res, next) => {
	try {
		const allTodos = await TodoModel.find();
		if (!allTodos) {
			return res.sendStatus(209);
		}
		return res.json(allTodos);
	} catch (error) {
		return res.status(500).json({ message: "Error creating a new Todo" });
	}
};

export const createNewTodo = async (req, res, next) => {
	try {
		const { title, completed } = req.body;
		await TodoModel.create({ title, completed });
		return res.json({ message: `Created new Todo - ${title}` });
	} catch (error) {
		return res.status(500).json({ message: "Error creating a new Todo" });
	}
};

export const editTodo = async (req, res, next) => {
	try {
		const { id, title, completed } = req.body;
		const itemToEdit = await TodoModel.findById(id);
		if (!itemToEdit) {
			return res
				.status(400)
				.json({ message: "There is no todo with that id." });
		}
		const newTitle = title ? title : itemToEdit.title;
		const newCompleted =
			completed !== undefined ? completed : itemToEdit.completed;
		console.log(newTitle, completed, newCompleted);
		await TodoModel.updateOne(
			{ _id: id },
			{ title: newTitle, completed: newCompleted }
		);
		return res.json({ message: `Updated Todo!` });
	} catch (error) {
		return res.status(500).json({ message: "Error updating a new Todo" });
	}
};

export const deleteTodo = async (req, res, next) => {
	try {
		const { id } = req.body;
		const itemToDelete = await TodoModel.findById(id);
		if (!itemToDelete) {
			return res
				.status(400)
				.json({ message: "There is no todo with that id." });
		}

		await TodoModel.deleteOne({ _id: id });
		return res.json({ message: `Deleted Todo!` });
	} catch (error) {
		return res.status(500).json({ message: "Error deleting a new Todo" });
	}
};
