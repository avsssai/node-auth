const whiteList = ["http://localhost:4300"];

export const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.indexOf(origin !== -1) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS."));
		}
	},
};
