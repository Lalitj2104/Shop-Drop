import jwt from "jsonwebtoken";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";
import Retailer from "../models/retailer.js";

export const isAuthenticate = async (req, res, next) => {
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
		const retailer = await Retailer.findById(decoded.id);

		// Check user
		if (!retailer) {
			return Response(res, 400, false, message.unAuthorizedMessage);
		}

		req.retailer = retailer;
		next();
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
