import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";

export const loginAdmin=async(req,res)=>{
    try {
        const {password}=req.body;
        console.log("working")

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