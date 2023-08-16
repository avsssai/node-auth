import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: String,
	roles: {
		User: {
			type: Number,
			default: 2001,
		},
		Editor: Number,
		Admin: Number,
	},
});

const UserModel = mongoose.model("User", UserSchema);
export { UserModel };
