import mongoose from "mongoose"
import bcrypt from "bcrypt"

const retailerSchema = new  mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please provide first name"],
        minlength:[3,"First name must be at least 3 characters"],
    },
    middleName:{
        type:String,
    },
    lastName:{
        type:String,
        required:true,
    },
    gstNumber:{
        type:String,
        unique:true,
        required:true,
        minlength: [10, "GST number must be atleast 10 digits"],
        maxlength: [10, "GST number must be at Max 10 digits"],

    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true,
    },  
    companyName:{
        type:String,
        required: [true, "Please provide  firm name"],
        unique: true,
    },   
    password:{
        type:String,
        requird:true,
        select:false,
        minlength:[8,"Password must be of atleast 8 characters"],
    },
    mobile:{
        type:Number,
        minlength: [10, "Mobile number must be atleast 10 digits"],
        maxlength: [10, "Mobile number must be at Max 10 digits"],
        unique: true,
    },
    dob:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","other"],
        default:"male",
    },
    isVerified:{
        type:Boolean,
        default:false,
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
    registerOtp:{
        type:Number
    },
    registerOtpExpire:{
        type:Date,
    },
    registerOtpAttempts:{
        type:Number,
        default:0
    },
    registerOtpLockUntil:{
        type:Date,
    },
    loginOtp:{
        type:Number,
    },
    loginOtpAttempts:{
        type:Number,
        default:0,
    },
    loginOtpAttemptsExpire:{
        type:Date
    },
    lockUntil:{
        type:Date,
    },
    loginOtpExpire:{
        type:Date,
    },

   
}
,
  {
    timestamps: true,
  }
);

retailerSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next;
});

retailerSchema.methods.generateToken=async function(){
    return JsonWebTokenError.sign({id:this._id},process.env.JWT_SECRET,{
        expireIn:process.env.JWT_EXPIRE,
    })
};

retailerSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

const Retailer=mongoose.model("Retailer",retailerSchema);
export default Retailer;