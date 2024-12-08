import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "Please provide first name"],
			minlength: [3, "First name must be at least 3 characters"],
		},
		middleName: {
			type: String,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, "Please provide an email"],
			unique: true,
		},
		username: {
			type: String,
			required: [true, "Please provide  username"],
			unique: true,
		},
		password: {
			type: String,
			requird: true,
			select: false,
			minlength: [8, "Password must be of atleast 8 characters"],
		},
		mobile: {
			type: Number,
			minlength: [10, "Mobile number must be atleast 10 digits"],
			maxlength: [10, "Mobile number must be at Max 10 digits"],
			unique: true,
		},
		dob: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		address: [
			{
				_id: { type: mongoose.Schema.Types.ObjectId },
				label: { type: String },
				house:{type: String, required: true},
				street: { type: String},
				area:{ type: String, required: true },
				city: { type: String, required: true },
				state: { type: String, required: true },
				postalCode: { type: String, required: true },
				country: { type: String, required: true },
				phoneNumber: { type: String, required: true },
				isDefault: { type: Boolean, default: false },
			},
		],
		gender: {
			type: String,
			required: true,
			enum: ["male", "female", "other"],
			default: "male",
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPassword: {
			type: Number,
		},
		resetPasswordExpire: {
			type: Date,
		},
		resetPasswordAttempts: {
			type: Number,
			default: 0,
		},
		resetPasswordLock: {
			type: Date,
		},
		registerOtp: {
			type: Number,
		},
		registerOtpExpire: {
			type: Date,
		},
		registerOtpAttempts: {
			type: Number,
			default: 0,
		},
		registerOtpLockUntil: {
			type: Date,
		},
		loginAttempts: {
			type: Number,
			default: 0,
		},
		lockUntil: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next;
});

userSchema.methods.generateToken = async function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
