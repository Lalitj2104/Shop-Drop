import Retailer from "../models/retailer";
import { message } from "../utils/message";
import { Response } from "../utils/response";

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
    //sending email
    const subject = "Verify your account";
    emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
    emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
    emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
    emailTemplate = emailTemplate.replace("{{USER_ID}}", user._id.toString());
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
            await user.save();
            return Response(res,400,false,`Try again after ${Math.floor(
          (user.registerOtpLockUntil - Date.now()) % (60 * 1000)
        )} minutes and ${Math.floor(
          (user.registerOtpLockUntil - Date.now()) % 1000
        )} seconds`)
         }
         //checking otp Attempts
         if(Retailer.registerOtpAttempts>=3){
            
         }
        
    } catch (error) {
        Response(res,500,false,error.message);
    }
};
export const resendOtp = async (req, res) => {};

export const loginRetailer = async (req, res) => {};
export const verifyLogin = async (req, res) => {};
export const resendLoginOtp = async (req, res) => {};

export const changePassword = async (req, res) => {};
export const forgotPassword = async (req, res) => {};
export const resetPassword = async (req, res) => {};
export const deleteRetailer = async (req, res) => {};

export const getRetailerProfile = async (req, res) => {};
export const updateRetailerProfile = async (req, res) => {};

export const getRetailerProducts = async (req, res) => {};
export const logoutRetailer = async (req, res) => {};
