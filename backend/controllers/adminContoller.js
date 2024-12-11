import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";
import dotenv from "dotenv"
dotenv.config({ path: "./config/config.env" });

export const loginAdmin=async(req,res)=>{
    try {
        console.log("working")
        const {password}=req.body;
        

        console.log(password)
        // console.log(process.env.ADMIN_SECRET)
        if(password.toString==process.env.ADMIN_SECRET){
            return Response(res,401,false,message.invalidkey);
        }
        Response(res,201,true,message.loginSuccessfulMessage)

        
    } catch (error) {
        Response(res,500,false,error.message)
    }
}

export const signOut=async(req,res)=>{
    try {
        Response(res,200,true,message.loginSuccessfulMessage);
    } catch (error) {
        Response(res,500,false,error.message);
    }
}