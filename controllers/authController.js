import { UserModel } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function authenticateUser(req, res, next) {
	try {
		// check if the user exists
		// check if his password's correct
		const { username, password } = req.body;
		const isValidUser = await UserModel.findOne({ username });
		if (!isValidUser) {
			return res
				.status(401)
				.json({ message: "No user with that username exists." });
		}

		const isValidPassword = await bcrypt.compare(
			password,
			isValidUser.password
		);
		if (!isValidPassword) {
			return res
				.status(401)
				.json({ message: "Username or password is incorrect." });
		}
		// user exists and password is correct - generate jwt token
		const roles = Object.values(isValidUser.roles);
		const payload = {
			UserInfo: {
				username,
				roles,
			},
		};
		const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "1m",
		});
		const refreshToken = jwt.sign(
			payload,
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: "1d",
			}
		);
		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		await UserModel.updateOne(
			{ username },
			{ refreshToken },
			{ multi: true }
		);
		return res.json({ access_token: token });
	} catch (error) {
		res.sendStatus(500);
	}
}
