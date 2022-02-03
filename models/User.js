const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String,
    },
    questions:[{
        qno : {type:Number},
        ques:{type:String},
        ans:{type:String},
        flagVal : {type:Boolean}
    }],
    score : {type:Number}
},{timestamps:true})



userSchema.methods.generateToken=async function(){
    try {
        const token=await jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:process.env.EXPIRES});
        return token;
    } catch (error) {
        throw new Error("Token is not generated!");
    }
}

const User=new mongoose.model("user",userSchema);
module.exports=User;