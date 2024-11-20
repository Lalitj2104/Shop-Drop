import { sendEMail } from "../middleware/sendMail";
import Retailer from "../models/retailer";
import { message } from "../utils/message";
import { Response } from "../utils/response";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cloudinary from "cloudinary";
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

    retailer.registerOtp=otp;
    retailer.registerOtpExpire=otpExpire;
    await retailer.save()
    //sending email
    let emailTemplate = fs.readFileSync(
        path.join(__dirname, "../templates/mail.html"),
        "utf-8"
      );
    const subject = "Verify your account";
    emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
    emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
    emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
    emailTemplate = emailTemplate.replace("{{USER_ID}}", retailer._id.toString());
    await sendEMail({ email, subject, html: emailTemplate });

    //creating retailer
    Response(res,200,true,message?.retailerCreatedMessage,retailer);
  } catch (error) {
    Response(res, 500, false, error.message);
  }
};

export const verify = async (req, res) => {
    try {
        //fetching id and otp
        const {id} =req.params;
        const{otp}=req.body;
        //checking id
        if(!id){
            return Response(res,400,false,message.idNotFoundMessage);
        }
        let retailer=await  Retailer.findById(id);
        if(!retailer){
            return Response(res,400,false,message.retailerNotFoundMessage);
        }
        //retailer already verified
        if(retailer.isVerified){
            return Response(res,400,false,message.retailerVerifiedMessage);
        }
         //otpAttempts lock
         if(retailer.registerOtpLockUntil>Date.now()){
            retailer.registerOtp=undefined;
            retailer.registerOtpExpire=undefined;
            retailer.registerOtpAttempts=0;
            await retailer.save();
            return Response(res,400,false,`Try again after ${Math.floor(
          (retailer.registerOtpLockUntil - Date.now()) % (60 * 1000)
        )} minutes and ${Math.floor(
          (retailer.registerOtpLockUntil - Date.now()) % 1000
        )} seconds`)
         }
         //checking otp Attempts
         if(Retailer.registerOtpAttempts>=3){
            retailer.registerOtp=undefined;
            retailer.registerOtpExpire=undefined;
            retailer.registerOtpAttempts=0;
            registerRetailer.registerOtpLockUntil=Date.now() + process.env.REGISTER_OTP_LOCK * 60 * 1000;
            await retailer.save();
            return Response(res,400,false,message.otpAttemptsExceededMessage);
         }
         //check otp
         if(!otp){
            retailer.registerOtpAttempts+=1;
            await retailer.save();
            return Response(res,400,false,message.otpNotFoundMessage);
         }
         if(retailer.registerOtpExpire<Date.now()){
            retailer.registerOtp=undefined;
            retailer.registerOtpAttempts=0;
            retailer.registerOtpLockUntil=undefined;
            await retailer.save();
            return Response(res,400,false,message.otpExpireMessage);
         }
         //match otp
         otp=Number(otp);
         if(retailer.registerOtp!==otp){
            retailer.registerOtpAttempts+=1;
            await retailer.save();
            return Response(res,400,false,message.invalidOtpMessage);
         }
         retailer.isVerified=true;
         retailer.registerOtp=undefined;
         retailer.registerOtpAttempts=0;
         retailer.registerOtpLockUntil=undefined;
         await retailer.save();

         //generate token
         const token=await retailer.generateToken();
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
        Response(res,500,false,error.message);
    }
};

export const resendOtp = async (req, res) => {
    try {
        //params and body
        const {id} =req.params;
        //checking id
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
        //retailer exist or not
        let retailer=await Retailer.findById(id);
        if(!retailer){
            return Response(res,400,false,message.retailerNotFoundMessage);
        }

        //retailer is alredy verified
        if(retailer.isVerified){
            return Response(res,400,false,message.retailerVerifiedMessage)
        }
        //generate new otp
		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.REGISTER_OTP_EXPIRE * 15 * 60 * 1000
		);

        //save otp
        retailer.registerOtp=otp;
        retailer.registerOtpExpire=otpExpire;
        retailer.registerOtpAttempts=0;
        await retailer.save();

        let emailTemplate = fs.readFileSync(
            path.join(__dirname, "../templates/mail.html"),
            "utf-8"
          );

        const subject = "Verify your account";

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace("{{USER_ID}}", retailer._id.toString());

        
    } catch (error) {
        Response(res,500,false,error.message);
    }
};

export const loginRetailer = async (req, res) => {
    try {
        //parsing body data
        const {email,password}=req.body;
        //checking the data
        if(!email ||!password){
            return Response(res,400,false,message.missingFieldMessage);
        }

        //find retailer
        let retailer=await Retailer.findOne({email}).select("+password");

        //check retailer
        if(!retailer){
            return Response(res,400,false,message.retailerNotFoundMessage);
        }

        //if retailer not verified
        if(!retailer.isVerified){
            return Response(res,400,false,message.retailerNotVerifiedMessage);
        }
        //login attempt is locked
        if(retailer.lockUntil<Date.now()){
            retailer.loginOtpAttempts=0;
            await retailer.save();
            return Response(res,400,false,message.loginLockedMessage);
        }
        //login Attempts exceeded or not
        if(Retailer.loginOtpAttempts>=process.nextTick.MAX_LOGIN_ATTEMPTS){
            retailer.loginOtpAttempts=0;
            retailer.lockUntil=new Date(
				Date.now() + process.env.MAX_LOGIN_ATTEMPTS_EXPIRE * 60 * 1000
			);
            await retailer.save();
            return Response(res,400,false,message.loginLockedMessage);
        }

        //check password
        const isMatch=await retailer.matchPassword(password);
        if(!isMatch){
            retailer.loginOtpAttempts+=1;
            await retailer.save();
            return Response(res,400,false,message.badAuthMessage);
        }
         //generate otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = new Date(
      Date.now() + process.env.OTP_EXPIRE * 15 * 60 * 1000
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
    emailTemplate = emailTemplate.replace("{{USER_ID}}", retailer._id.toString());

    await sendEMail({ email, subject, html: emailTemplate });

        retailer.loginOtp=otp;
        retailer.loginOtpExpire=otpExpire;
        retailer.loginOtpAttempts=0;
        retailer.lockUntil=undefined;
        await retailer.save();
        Response(res,200,true,message.otpSendMessage,retailer._id);
    } catch (error) {
        Response(res,500,false,error.message);
    }
};
export const verifyLogin = async (req, res) => {
    try {
        //parsing
        const {id}=req.params;
        const {otp} =req.body;

        //checking id
        if(!id){
            return Response(res,400,false,message.idNotFoundMessage);
        }
        //finding retailer
        let retailer=await Retailer.findById(id);

        //checking retailer
        if(!retailer){
            return Response(res,400,false,message.retailerNotFoundMessage)
        }

    } catch (error) {
        Response(res,500,false,error.message);
    }
};
export const resendLoginOtp = async (req, res) => {};

export const changePassword = async (req, res) => {};
export const forgotPassword = async (req, res) => {};
export const resetPassword = async (req, res) => {};
export const deleteRetailer = async (req, res) => {};

export const getRetailerProfile = async (req, res) => {};
export const updateRetailerProfile = async (req, res) => {};

export const getRetailerProducts = async (req, res) => {};
export const logoutRetailer = async (req, res) => {};
