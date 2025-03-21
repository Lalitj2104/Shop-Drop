import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";
import User from "../models/user.js";
import { sendEMail } from "../middleware/sendMail.js";
import path from "path";
import fs from "fs";
import Review from "../models/review.js";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import WishList from "../models/wishList.js";
import Product from "../models/product.js";
import Retailer from "../models/retailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const myProfile = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 404, false, message.userNotFoundMessage);
		}
		const user = await User.findById(req.user._id);

		Response(res, 200, true, message.userProfileFoundMessage, user);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
export const registerUser = async (req, res) => {
	try {
		//parsing body data
		const {
			firstName,
			middleName,
			lastName,
			email,
			username,
			password,
			mobile,
			dob,
			gender,
		} = req.body;
		//checking body data
		console.log("working");
		if (
			!firstName ||
			!lastName ||
			!email ||
			!username ||
			!password ||
			!mobile ||
			!dob ||
			!gender
		) {
			return Response(res, 400, false, message.missingFieldMessage);
		}

		//checking user
		let user = await User.findOne({ email });
		if (user) {
			return Response(res, 400, false, message.userAlreadyExist);
		}

		user = await Retailer.findOne({ email });
		if (user) {
			return Response(res, 400, false, message.emailAlreadyRegisteredmessage);
		}

		user = await User.findOne({ username });
		if (user) {
			return Response(res, 400, false, message.userAlreadyExist);
		}

		//spreading data
		user = await User.create({ ...req.body });

		//generating otp
		const otp = Math.floor(100000 + Math.random() * 90000);
		const otpExpire = new Date(Date.now() + 5 * 60 * 1000);
		user.registerOtp = otp;
		user.registerOtpExpire = otpExpire;
		await user.save();
		//send email

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);
		const subject = "Verify your account";
		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace("{{USER_ID}}", user._id.toString());
		await sendEMail({ email, subject, html: emailTemplate });

		//creating user
		Response(res, 200, true, message?.userCreatedMessage, user);
		//send response
	} catch (error) {
		Response(res, 500, error?.message);
	}
};

export const verifyUser = async (req, res) => {
	try {
		//fetching id and otp
		const { id } = req.params;
		let { otp } = req.body;
		//checking id
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
		//finding user
		let user = await User.findById(id);
		//checking user exist or not
		if (!user) {
			return Response(res, 404, false, message.userNotFoundMessage);
		}
		//user already verified
		if (user.isVerified) {
			return Response(res, 400, false, message.userAlreadyVerified);
		}
		//otpAttempt lock or not
		if (user.registerOtpLockUntil > Date.now()) {
			user.registerOtp = undefined;
			user.registerOtpExpire = undefined;
			user.registerOtpAttempts = 0;
			await user.save();
			return Response(
				res,
				400,
				false,
				`Try again after ${Math.floor(
					(user.registerOtpLockUntil - Date.now()) % (60 * 1000)
				)} minutes and ${Math.floor(
					(user.registerOtpLockUntil - Date.now()) % 1000
				)} seconds`
			);
		}
		//checking otp attempts
		if (user.registerOtpAttempts >= 3) {
			user.registerOtp = undefined;
			user.registerOtpExpire = undefined;
			user.registerOtpAttempts = 0;
			user.registerOtpLockUntil =
				Date.now() + process.env.REGISTER_OTP_LOCK * 60 * 1000;
			await user.save();
			return Response(res, 400, false, message.otpAttemptsExceededMessage);
		}
		//check otp
		if (!otp) {
			user.registerOtpAttempts += 1;
			await user.save();
			return Response(res, 400, false, message.otpNotFoundMessage);
		}
		//check otp expire
		if (user.registerOtpExpire < Date.now()) {
			user.registerOtp = undefined;
			user.registerOtpAttempts = 0;
			user.registerOtpLockUntil = undefined;
			await user.save();
			return Response(res, 400, false, message.otpExpireMessage);
		}
		// match otp
		otp = Number(otp);
		if (user.registerOtp !== otp) {
			user.registerOtpAttempts += 1;
			await user.save();
			return Response(res, 400, false, message.invalidOtpMessage);
		}
		//update user
		user.isVerified = true;
		user.registerOtp = undefined;
		user.registerOtpExpire = undefined;
		user.registerOtpAttempts = 0;
		user.registerOtpLockUntil = undefined;
		await user.save();

		//authenticate user
		const token = await user.generateToken();
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
			message: message.userVerifiedMessage,
			data: user,
		});
	} catch (error) {
		return Response(res, 500, false, error.message);
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
		//user exist or not
		let user = await User.findById(id);
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}

		//user already verified
		if (user.isVerified) {
			return Response(res, 400, false, message.userAlreadyVerified);
		}
		//generate new otp
		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.REGISTER_OTP_EXPIRE * 15 * 60 * 1000
		);
		//save otp
		user.registerOtp = otp;
		user.registerOtpExpire = otpExpire;
		user.registerOtpAttempts = 0;
		await user.save();
		//send otp

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);
		const subject = "Verify your account";

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace("{{USER_ID}}", user._id.toString());

		await sendEMail({ email: user.email, subject, html: emailTemplate });
		//send response
		Response(res, 200, true, message.otpSendMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const loginUser = async (req, res) => {
	try {
		//params and body
		const { email, password } = req.body;
		//checking data
		if (!email || !password) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		//find user
		let user = await User.findOne({ email }).select("+password");
		//user exist aur not
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}

		//user is verified or not
		if (!user.isVerified) {
			return Response(res, 400, false, message.userNotVerifiedMessage);
		}
		//login attempt locked or not
		if (user.lockUntil < Date.now()) {
			user.loginAttempts = 0;
			await user.save();
			return Response(res, 400, false, message.loginLockedMessage);
		}
		//login attempt exceeded or not
		if (user.loginAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
			user.loginAttempts = 0;
			user.lockUntil = new Date(
				Date.now() + process.env.MAX_LOGIN_ATTEMPTS_EXPIRE * 60 * 1000
			);
			await user.save();
			return Response(res, 400, false, message.loginLockedMessage);
		}
		//check password
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			user.loginAttempts += 1;
			await user.save();
			return Response(res, 400, false, message.badAuthMessage);
		}

		user.loginAttempts = 0;
		user.lockUntil = undefined;
		await user.save();
		//authenticate user
		const token = await user.generateToken();
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
			data: user,
		});
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
		let user = await User.findOne({ email });
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
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
		emailTemplate = emailTemplate.replace("{{USER_ID}}", user._id.toString());

		await sendEMail({ email: user.email, subject, html: emailTemplate });

		//saving the values
		user.resetPassword = otp;
		user.resetPasswordExpire = otpExpire;
		await user.save();
		//sending the response
		Response(res, 200, true, message.otpSendMessage, user._id);
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
			return Response(res, 400, false, message.userNotFoundMessage);
		}

		//checking user
		let user = await User.findById(id);
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		// otp check
		if (user.resetPasswordLock < Date.now()) {
			user.resetPassword = undefined;
			user.resetPasswordExpire = undefined;
			user.resetPasswordAttempts = 0;
			await user.save();
			return Response(res, 400, false, message.otpAttemptsExceededMessage);
		}

		if (user.resetPasswordExpire < Date.now()) {
			user.resetPassword = undefined;
			user.resetPasswordExpire = undefined;
			user.resetPasswordAttempts = 0;
			await user.save();
			return Response(res, 400, false, message.otpExpireMessage);
		}

		if (user.resetPasswordAttempts >= process.env.MAX_RESET_ATTEMPTS) {
			user.resetPassword = undefined;
			user.resetPasswordExpire = undefined;
			user.resetPasswordAttempts = 0;
			user.resetPasswordLock = new Date(
				Date.now() + process.env.MAX_RESET_LOCK * 60 * 1000
			);
			await user.save();
			return Response(res, 400, false, message.otpAttemptsExceededMessage);
		}
		5;
		if (!otp) {
			return Response(res, 400, false, message.otpNotFoundMessage);
		}

		otp = Number(otp);

		//matching otp
		if (user.resetPassword !== otp) {
			user.resetPasswordAttempts += 1;
			await user.save();

			return Response(res, 400, false, message.invalidOtpMessage);
		}

		user.resetPassword = undefined;
		user.resetPasswordAttempts = 0;
		user.resetPasswordExpire = undefined;
		await user.save();

		return Response(res, 200, true, message.otpVerifiedMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const changePassword = async (req, res) => {
	try {
		//params and cookie
		const { id } = req.params;
		const { password } = req.body;
		//checking id
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
		//checking body data
		if (!password) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		let user = await User.findById(id).select("+password");
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		user.password = password;
		await user.save();
		//doing token null for logout
		res.cookie("token", null, {
			expires: new Date(Date.now()),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		Response(res, 200, true, message.passwordChangeMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getUserProfile = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 404, false, message.userNotFoundMessage);
		}

		Response(res, 200, true, message.userProfileFoundMessage, req.user);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const updateUserProfile = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 404, false, message.userNotFoundMessage);
		}

		const user = await User.findByIdAndUpdate(req.user._id, req.body, {
			new: true,
			runValidators: true,
			timestamps: true,
			upsert: true,
		});
		if (!user) {
			return Response(res, 404, false, message.userNotFoundMessage);
		}

		Response(res, 200, true, message.userProfileUpdatedMessage, user);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const logoutUser = async (req, res) => {
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

export const deleteUser = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		const id = req.user.id;
		let user = await User.findById(id);

		if (!user) {
			Response(res, 400, false, message.userNotFoundMessage);
		}
		await Review.deleteMany({ user_id: id });

		await User.findByIdAndDelete(id);

		Response(res, 200, true, message.userDeletedMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		if (!users) {
			return Response(res, 400, false, message.usersNotFoundMessage);
		}

		Response(res, 201, true, message.usersFoundMessage, users);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const addAddress = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		const { address } = req.body;
		if (!address) {
			return Response(res, 401, false, message.missingFieldMessage);
		}
		if (
			!address.house ||
			!address.area ||
			!address.city ||
			!address.state ||
			!address.postalCode ||
			!address.country ||
			!address.phoneNumber
		) {
			return Response(res, 400, false, message.missingFieldMessage);
		}

		const user = await User.findById(req.user.id);
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		const newAddress = {
			...address,
			_id: new mongoose.Types.ObjectId(), // Generate a unique ObjectId for the address
		};
		if (user.address.length == 0) {
			newAddress.isDefault = true;
		}
		user.address.push(newAddress);

		await user.save();
		Response(res, 200, true, message.addressAddMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllAddress = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		const user = await User.findById(req.user.id);
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		if (!user.address || user.address.length === 0) {
			return Response(res, 400, false, message.addressNotFoundMessage);
		}
		Response(res, 200, true, message.getAddressMessage, user.address);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const setDefaultAddress = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		const { addressId } = req.params;
		if (!addressId) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		const user = await User.findById(req.user.id);
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		const address = user.address.id(addressId);
		if (!address) {
			return Response(res, 404, false, message.addressNotFoundMessage);
		}

		user.address.forEach((addr) => (addr.isDefault = false));

		address.isDefault = true;
		await user.save();

		Response(res, 200, true, message.addressSetMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const removeAddress = async (req, res) => {
	try {
		if (!req.user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		const userId = req.user._id;
		const { addressId } = req.params;

		const user = await User.findById(userId);
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}
		// Find the address to be removed by addressId
		const addressIndex = user.address.findIndex(
			(address) => address._id.toString() === addressId
		);

		if (addressIndex === -1) {
			return Response(res, 400, false, message.addressNotFoundMessage);
		}

		// Remove the address from the array
		user.address.splice(addressIndex, 1);

		// Save the updated user
		await user.save();

		// Send response
		Response(res, 200, true, message.addressRemovedMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const addWish = async (req, res) => {
	try {
		const { productId } = req.params;
		const product = await Product.findById(productId);
		if (!product) {
			return Response(res, 400, message.noProductMessage);
		}
		console.log("Id: ", req.user._id);

		let wishList = await WishList.findOne({ userId: req.user._id });

		console.log(wishList);

		if (wishList) {
			const productExists = wishList.products.some(
				(item) => item.toString() === productId
			);

			if (productExists) {
				return Response(res, 400, message.productAlreadyMessage);
			}
			wishList.products.push(product._id);
			await wishList.save();
		} else {
			wishList = await WishList.create({
				userId: req.user._id,
				products: [product._id],
			});
		}

		Response(res, 200, true, message.productAddedToWishListMessage, wishList);
	} catch (error) {
		console.log(error.message);
		Response(res, 500, false, error.message);
	}
};

export const getWish = async (req, res) => {
	try {
		const wishList = await WishList.findOne({ userId: req.user._id }).populate(
			"products",
			"image description name price"
		);

		console.log(wishList);

		Response(res, 200, true, message.wishListFoundMessage, wishList);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const deleteWish = async (req, res) => {
	try {
		const wishList = await WishList.findOne({ userId: req.user._id });
		if (wishList.products.length >= 1) {
			wishList.products = [];
		}
		await wishList.save();
		Response(res, 200,true, message.wishListRemovedmessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

//incomplete

export const updateWish = async (req, res) => {
	try {
		const { ProductId } = req.params;
		const product = await Product.findById(ProductId);
		if (!product) {
			return Response(res, 400, message.noProductMessage);
		}

		let wishList = await WishList.findOne({ userId: req.user._id });

		if (!wishList) {
			return Response(res, 400, false, message.wishListNotFoundMessage);
		}
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const removeWish = async (req, res) => {
	try {
		const { productId } = req.params; // The ID of the product to be removed
		const wishList = await WishList.findOne({ userId: req.user._id });

		if (!wishList) {
			return Response(res, 404, false, message.wishListNotFoundMessage);
		}

		// Filter out the product to be removed
		const productIndex = wishList.products.findIndex(
			(item) => item.toString() === productId
		);

		if (productIndex === -1) {
			return Response(res, 404, false, message.productNotFoundMessage);
		}

		wishList.products.splice(productIndex, 1); // Remove the product
		await wishList.save();

		Response(res, 200, true, message.productRemovedFromWishListMessage, wishList);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
