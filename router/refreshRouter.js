import express from "express";
import { generateAccessTokenOffRefreshToken } from "../controllers/refreshController.js";

const refreshRouter = express.Router();

refreshRouter.route("/").get(generateAccessTokenOffRefreshToken);

export { refreshRouter };
