import { UserModel } from "../models/User.js";
import bcrypt from "bcrypt";

export async function getAllUsers(req, res, next) {
	try {
		const allUsers = await UserModel.find();
		if (!allUsers) return res.sendStatus(209);
		return res.json(allUsers);
	} catch (error) {
		return res.sendStatus(500);
	}
}

export async function createUser(req, res) {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res
				.status(400)
				.json({ message: "Username or password is missing." });
		}
		// create a hash password
		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = { username, password: passwordHash };
		await UserModel.create(newUser);
		res.json({ message: `Created new user - ${username}` });
	} catch (error) {
		return res.sendStatus(500);
	}
}

export async function deleteUser() {
	try {
		const { id } = req.body;
		if (!id) {
			return res
				.status(400)
				.json({ message: "id to delete is missing from req body." });
		}

		const userExists = await UserModel.findById(id);
		if (!userExists) {
			return res.status(400).json({ message: "No user with that ID." });
		}

		await UserModel.deleteOne({ _id: id });
		res.json({ message: `Deleted one user - ${id}` });
	} catch (error) {
		return res.sendStatus(500);
	}
}
