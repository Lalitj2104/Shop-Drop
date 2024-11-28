import { sendEMail } from "../middleware/sendMail.js";
import Retailer from "../models/retailer.js";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cloudinary from "cloudinary";
import Product from "../models/product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerRetailer = async (req, res) => {
	try {
		//parsing the data
		const {
			firstName,
			middleName,
			lastName,
			gstNumber,
			email,
			companyName,
			password,
			mobile,
			dob,
			gender,
		} = req.body;
		//checking the data
		if (
			!firstName ||
			!lastName ||
			!gstNumber ||
			!email ||
			!companyName ||
			!password ||
			!mobile ||
			!dob ||
			!gender
		) {
			return Response(res, 400, false, message.missingFieldMessage);
		}

		//checking retailer
		let retailer = await Retailer.findOne({ email });
		if (retailer) {
			return Response(res, 400, false, message.retailerAlreadyExistMessage);
		}

		//spreading data
		retailer = await Retailer.create({ ...req.body });
		//generating otp
		const otp = Math.floor(100000 + Math.random() * 90000);
		const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

		retailer.registerOtp = otp;
		retailer.registerOtpExpire = otpExpire;
		await retailer.save();
		//sending email
		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);
		const subject = "Verify your account";
		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			retailer._id.toString()
		);
		await sendEMail({ email, subject, html: emailTemplate });

		//creating retailer
		Response(res, 200, true, message?.retailerCreatedMessage, retailer._id);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const verify = async (req, res) => {
	try {
		//fetching id and otp
		const { id } = req.params;
		let { otp } = req.body;
		//checking id
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
		let retailer = await Retailer.findById(id);
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}
		//retailer already verified
		if (retailer.isVerified) {
			return Response(res, 400, false, message.retailerVerifiedMessage);
		}
		//otpAttempts lock
		if (retailer.registerOtpLockUntil > Date.now()) {
			retailer.registerOtp = undefined;
			retailer.registerOtpExpire = undefined;
			retailer.registerOtpAttempts = 0;
			await retailer.save();
			return Response(
				res,
				400,
				false,
				`Try again after ${Math.floor(
					(retailer.registerOtpLockUntil - Date.now()) % (60 * 1000)
				)} minutes and ${Math.floor(
					(retailer.registerOtpLockUntil - Date.now()) % 1000
				)} seconds`
			);
		}
		//checking otp Attempts
		if (Retailer.registerOtpAttempts >= 3) {
			retailer.registerOtp = undefined;
			retailer.registerOtpExpire = undefined;
			retailer.registerOtpAttempts = 0;
			registerRetailer.registerOtpLockUntil =
				Date.now() + process.env.REGISTER_OTP_LOCK * 60 * 1000;
			await retailer.save();
			return Response(res, 400, false, message.otpAttemptsExceededMessage);
		}
		//check otp
		if (!otp) {
			retailer.registerOtpAttempts += 1;
			await retailer.save();
			return Response(res, 400, false, message.otpNotFoundMessage);
		}
		if (retailer.registerOtpExpire < Date.now()) {
			retailer.registerOtp = undefined;
			retailer.registerOtpAttempts = 0;
			retailer.registerOtpLockUntil = undefined;
			await retailer.save();
			return Response(res, 400, false, message.otpExpireMessage);
		}
		//match otp
		otp = Number(otp);
		if (retailer.registerOtp !== otp) {
			retailer.registerOtpAttempts += 1;
			await retailer.save();
			return Response(res, 400, false, message.invalidOtpMessage);
		}
		retailer.isVerified = true;
		retailer.registerOtp = undefined;
		retailer.registerOtpAttempts = 0;
		retailer.registerOtpLockUntil = undefined;
		await retailer.save();

		//generate token
		const token = await retailer.generateToken();
		const options = {
			expires: new Date(
				Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		};
		//sending response
		res.status(200).cookie("token", token, options).json({
			success: true,
			message: message.retailerVerifiedMessage,
			data: retailer,
		});
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const resendOtp = async (req, res) => {
	try {
		//params and body
		const { id } = req.params;
		//checking id
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
		//retailer exist or not
		let retailer = await Retailer.findById(id);
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}

		//retailer is alredy verified
		if (retailer.isVerified) {
			return Response(res, 400, false, message.retailerVerifiedMessage);
		}
		//generate new otp
		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.REGISTER_OTP_EXPIRE * 15 * 60 * 1000
		);

		//save otp
		retailer.registerOtp = otp;
		retailer.registerOtpExpire = otpExpire;
		retailer.registerOtpAttempts = 0;
		~(await retailer.save());

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);

		const subject = "Verify your account";

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			retailer._id.toString()
		);
		await sendEMail({ email: retailer.email, subject, html: emailTemplate });

		//creating retailer
		Response(res, 200, true, message?.otpSendMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const loginRetailer = async (req, res) => {
	try {
		//parsing body data
		const { email, password } = req.body;
		//checking the data
		if (!email || !password) {
			return Response(res, 400, false, message.missingFieldMessage);
		}

		//find retailer
		let retailer = await Retailer.findOne({ email }).select("+password");

		//check retailer
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}

		//if retailer not verified
		if (!retailer.isVerified) {
			return Response(res, 400, false, message.retailerNotVerifiedMessage);
		}
		//login attempt is locked
		if (retailer.lockUntil < Date.now()) {
			retailer.loginOtpAttempts = 0;
			await retailer.save();
			return Response(res, 400, false, message.loginLockedMessage);
		}
		//login Attempts exceeded or not
		if (Retailer.loginOtpAttempts >= process.nextTick.MAX_LOGIN_ATTEMPTS) {
			retailer.loginOtpAttempts = 0;
			retailer.lockUntil = new Date(
				Date.now() + process.env.MAX_LOGIN_ATTEMPTS_EXPIRE * 60 * 1000
			);
			await retailer.save();
			return Response(res, 400, false, message.loginLockedMessage);
		}

		//check password
		const isMatch = await retailer.matchPassword(password);
		if (!isMatch) {
			retailer.loginOtpAttempts += 1;
			await retailer.save();
			return Response(res, 400, false, message.badAuthMessage);
		}
		//generate otp
		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.LOGIN_OTP_EXPIRE * 15 * 60 * 1000
		);

		//send otp

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);
		const subject = "Two step verification";
		// const body = `Your OTP is ${otp}`;

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			retailer._id.toString()
		);

		await sendEMail({ email, subject, html: emailTemplate });

		retailer.loginOtp = otp;
		retailer.loginOtpExpire = otpExpire;
		retailer.loginOtpAttempts = 0;
		retailer.lockUntil = undefined;
		await retailer.save();
		Response(res, 200, true, message.otpSendMessage, retailer._id);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
export const verifyLogin = async (req, res) => {
	try {
		//parsing
		const { id } = req.params;
		let { otp } = req.body;

		//checking id
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
		//finding retailer
		let retailer = await Retailer.findById(id);

		//checking retailer
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}

		//if retailer not verified
		if (!retailer.isVerified) {
			return Response(res, 400, false, message.retailerNotVerifiedMessage);
		}
		if (retailer.loginOtpAttemptsExpire > Date.now()) {
			return Response(res, 400, false, message.loginLockedMessage);
		}
		//checking attempts
		if (retailer.loginOtpAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
			return Response(res, 400, false, message.otpAttemptsExceededMessage);
		}

		//checking otp
		if (!otp) {
			retailer.loginOtpAttempts += 1;
			await retailer.save();
			return Response(res, 400, false, message.otpNotFoundMessage);
		}
		//checking expire time
		if (retailer.loginOtpExpire < Date.now()) {
			return Response(res, 400, false, message.otpExpireMessage);
		}
		//matching otp
		otp = Number(otp);
		if (retailer.loginOtp !== otp) {
			retailer.loginOtpAttempts += 1;
			await retailer.save();
			return Response(res, 400, false, message.invalidOtpMessage);
		}
		retailer.loginOtp = undefined;
		retailer.loginOtpAttempts = 0;
		retailer.loginOtpAttemptsExpire = undefined;
		retailer.loginOtpExpire = undefined;
		await retailer.save();

		//generating and saving the token
		const token = await retailer.generateToken();
		// console.log(token);
		const options = {
			expires: new Date(
				Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		};

		//sending response
		res.status(200).cookie("token", token, options).json({
			success: true,
			message: message.loginSuccessfulMessage,
			data: retailer,
		});
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
export const resendLoginOtp = async (req, res) => {
	try {
		//parsing params
		const { id } = req.params;

		//checking it
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
		//checking user
		let retailer = await Retailer.findById(id);
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}
		//generating otp and saving
		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.LOGIN_OTP_EXPIRE * 15 * 60 * 1000
		);

		retailer.loginOtp = otp;
		retailer.loginOtpAttempts = 0;
		retailer.loginOtpAttemptsExpire = undefined;
		retailer.loginOtpExpire = otpExpire;
		await retailer.save();

		//send mail

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);
		const subject = "Two step verification";

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			retailer._id.toString()
		);
		const email = retailer.email;
		await sendEMail({ email, subject, html: emailTemplate });

		Response(res, 200, true, message.otpSendMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const forgotPassword = async (req, res) => {
	try {
		//parse data
		const { email } = req.body;
		//checking the data
		if (!email) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		//checking user
		let retailer = await Retailer.findOne({ email });
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}
		//generating otp for reset
		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.OTP_EXPIRE * 15 * 60 * 1000
		);

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);
		const subject = "Reset your password";
		// const body = `Your OTP is ${otp}`;

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			retailer._id.toString()
		);

		await sendEMail({ email: retailer.email, subject, html: emailTemplate });

		//saving the values
		retailer.resetPassword = otp;
		retailer.resetPasswordExpire = otpExpire;
		await retailer.save();
		//sending the response
		Response(res, 200, true, message.otpSendMessage, retailer._id);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const resetPassword = async (req, res) => {
	try {
		//parsing the data
		const { id } = req.params;
		let { otp } = req.body;
		//checking the id
		if (!id) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}

		//checking user
		let retailer = await User.findById(id);
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}
		// otp check
		if (retailer.resetPasswordLock < Date.now()) {
			retailer.resetPassword = undefined;
			retailer.resetPasswordExpire = undefined;
			retailer.resetPasswordAttempts = 0;
			await retailer.save();
			return Response(res, 400, false, message.otpAttemptsExceededMessage);
		}

		if (retailer.resetPasswordExpire < Date.now()) {
			retailer.resetPassword = undefined;
			retailer.resetPasswordExpire = undefined;
			retailer.resetPasswordAttempts = 0;
			await retailer.save();
			return Response(res, 400, false, message.otpExpireMessage);
		}

		if (retailer.resetPasswordAttempts >= process.env.MAX_RESET_ATTEMPTS) {
			retailer.resetPassword = undefined;
			retailer.resetPasswordExpire = undefined;
			retailer.resetPasswordAttempts = 0;
			retailer.resetPasswordLock = new Date(
				Date.now() + process.env.MAX_RESET_LOCK * 60 * 1000
			);
			await retailer.save();
			return Response(res, 400, false, message.otpAttemptsExceededMessage);
		}
		5;
		if (!otp) {
			return Response(res, 400, false, message.otpNotFoundMessage);
		}

		otp = Number(otp);

		//matching otp
		if (retailer.resetPassword !== otp) {
			retailer.resetPasswordAttempts += 1;
			await retailer.save();

			return Response(res, 400, false, message.invalidOtpMessage);
		}

		retailer.resetPassword = undefined;
		retailer.resetPasswordAttempts = 0;
		retailer.resetPasswordExpire = undefined;
		await retailer.save();

		return Response(res, 200, true, message.otpVerifiedMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
export const changePassword = async (req, res) => {
	try {
		//params and cookie
		const { id } = req.user;
		const { password } = req.body;
		//checking id
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
		//checking body data
		if (!password) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		let retailer = await Retailer.findById({ id }).select("+password");
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}
		retailer.password = password;
		await retailer.save();
		//doing token null for logout
		res.cookie("token", null, {
			expires: new Date(Date.now()),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		Response(res, 200, true, passwordChangeMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
export const getRetailerProfile = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 404, false, message.retailerNotFoundMessage);
		}

		Response(res, 200, true, message.retailerProfileFoundMessage, req.user);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
export const updateRetailerProfile = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 404, false, message.retailerNotFoundMessage);
		}

		const retailer = await User.findByIdAndUpdate(req.user._id, req.body, {
			new: true,
			runValidators: true,
			timestamps: true,
			upsert: true,
		});
		if (!user) {
			return Response(res, 404, false, message.retailerNotFoundMessage);
		}

		Response(res, 200, true, message.retailerProfileUpdatedMessage, retailer);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
export const logoutRetailer = async (req, res) => {
	try {
		res.cookie("token", null, {
			expires: new Date(Date.now()),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		Response(res, 200, true, message.logoutMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const deleteRetailer = async (req, res) => {
	try {
		//checking req user
		if (!req.user) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}
		//parsing data
		const id = req.user.id;
		//find and delete
		const retailer = await Retailer.findById(id);
		//retailer is not there
		if (!retailer) {
			Response(res, 400, false, message.retailerNotFoundMessage);
		}
		//getting all products
		const products = await Product.find({ retailer_id: id });

		//deleting product img

		//geting ids of each product
		const productIds = products.map((product) => product._id);

		//delete the reviews
		await Review.deleteMany({ product_id: { $in: productIds } });

		//finally delete retailer
		await Retailer.findByIdAndDelete(id);

		//sending the response
		Response(res, 200, true, message.retailerDeletedMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getRetailerProducts = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}
		//parsing data
		const id = req.user.id;
		//checking the id
		let retailer = await Retailer.findById(id);
		if (!retailer) {
			return Response(res, 400, false, message.retailerNotFoundMessage);
		}
		const products = await Product.find({ retailer_id: id });
		if (!products) {
			return Response(res, 400, false, message.noProductMessage);
		}
		Response(res, 200, true, message.productFetchedMessage, products);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
