import jwt from "jsonwebtoken";
import { message } from "../utils/message.js";
import User from "../models/user.js";
import { Response } from "../utils/response.js";

export const isAuthenticated = async (req, res, next) => {
	try {
		// Parsing cookies
		const { token } = req.cookies;

		// Check token
		if (!token) {
			return Response(res, 401, false, message.unAuthorizedMessage);
		}

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Find user from token
		const user = await User.findById(decoded.id);

		// Check user
		if (!user) {
			return Response(res, 400, false, message.unAuthorizedMessage);
		}

		req.user = user;
		next();
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
