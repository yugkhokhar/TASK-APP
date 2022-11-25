const jwt=require("jsonwebtoken");
const User=require("../model/user");

const auth=async(req,res,next)=>
{
try{
    const tokenbyuser=req.header("Authorization").replace("Bearer ","");
    const decoded=jwt.verify(tokenbyuser,"thisismynewcourse");
     const user=await User.findOne({_id:decoded._id,"tokens.token":tokenbyuser})
if(!user)
{
 throw new Error();
}
req.user=user;    
req.token=tokenbyuser;
next()
 }
 catch(e)
  {
   res.send({error:"PLEASE AUTHENTICATE CORRECTLY"})
  }

}
module.exports=auth;