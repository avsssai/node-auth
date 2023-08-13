import mongoose from "mongoose";

export const DbConnection = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
	} catch (error) {
		console.error("Error connecting to the Mongo Instance.");
		process.exit(1);
	}
};
