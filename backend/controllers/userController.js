


export const registerUser=(req,res)=>{
    try {
        //parsing body data
        //checking body data
        //checking user
        //generating otp
        //send email
        //creating user
        //send response
    } catch (error) {
        
    }
}

export const verifyUser=(req,res)=>{
    try {
        //fetching id and otp
        //checking id 
        //finding user
        //checking user exist or not
        //user already verified
        //otpAttempt lock or not
        //checking otp attempts
        //check otp
        //check otp expire
        // match otp
        //update user
        //authenticate user
        //sending response
    } catch (error) {
        
    }
}
export const resendOtp=(req,res)=>{
    try {
        //params and body

        //checking id
        //user exist or not
        //user already verified
        //generate new otp
        //save otp
        //send otp
        //send response
    } catch (error) {
        
    }
}

export const loginUser=(req,res)=>{

    try {
    //params and body
    //checking data
    //find user
    //user exist aur not
    //login attempt locked or not
    //login attempt exceeded or not
    //check password
    //generate otp
    //send otp
    //update user for otp
    //response
    } catch (error) {
        
    }
}


export const resetPassword=(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
export const changePassword=(req,res)=>{}
export const forgotPassword=async(req,res)=>{}

export const getUserProfile=(req,res)=>{}
export const updateUserProfile=(req,res)=>{}
export const logoutUser=(Req,res)=>{}
export const deleteUser=(req,res)=>{}

export const addAddress=async(req,res)=>{};
export const getAllAddress=async(req,res)=>{}
export const setDefaultAddress=async(req,res)=>{}
export const removeAddress=async(req,res)=>{};
 