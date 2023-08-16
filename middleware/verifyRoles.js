// check for appropriate roles

export const verifyRoles = (...rolesAllowed) => {
	return async (req, res, next) => {
		if (!req?.roles) {
			res.sendStatus(403);
		}
		const roles = req.roles; // these are the roles on the user
		// compare them against the roles we assigned to the resourse the [rolesAllowed]
		const allRolesPresent = rolesAllowed.every((role) =>
			roles.includes(role)
		);
		if (!allRolesPresent) {
			return res.sendStatus(403);
		}
		next();
	};
};
