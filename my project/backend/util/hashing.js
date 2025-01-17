const bcrypt=require("bcrypt");
exports.hashPassword=async(password)=>{
    const hashedPassword =await bcrypt.hash(password,10);
    return hashedPassword;
}
exports.isMatch=async(password,savedPassword)=>{
    return await bcrypt.compare(password,savedPassword)//plain text then hashed
}