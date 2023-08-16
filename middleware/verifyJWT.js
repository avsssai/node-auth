import jwt from "jsonwebtoken";

export function verifyJWT(req, res, next) {
	const token =
		req.headers["x-access-token"] ||
		req.headers["Authorization"] ||
		req.headers["authorization"];
	if (!token || !token.startsWith("Bearer ")) {
		return res.sendStatus(401);
	}
	let tokenData = token.split(" ")[1];
	const tokenVerification = jwt.verify(
		tokenData,
		process.env.ACCESS_TOKEN_SECRET,
		(err, decoded) => {
			if (err) {
				return res.sendStatus(401);
			}

			req.user = decoded.UserInfo.username;
			req.roles = decoded.UserInfo.roles;
			next();
		}
	);
}
