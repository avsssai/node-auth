import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";

export async function generateAccessTokenOffRefreshToken(req, res, next) {
	// check if there is a refresh token
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}
	try {
		const refreshToken = cookies.jwt;
		const isValidUser = await UserModel.findOne({ refreshToken });
		if (!isValidUser) {
			return res.sendStatus(401);
		}
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if (err || isValidUser.username !== decoded.UserInfo.username) {
					return res.sendStatus(403);
				}
				const accessToken = jwt.sign(
					decoded.UserInfo,
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "1m" }
				);
				return res.json({ accessToken });
			}
		);
	} catch (error) {
		return res.sendStatus(500);
	}
}
