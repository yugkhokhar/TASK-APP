require("../src/db/mongoose.js");
const User=require("../src/model/user.js");
/*
User.findByIdANDUpdate("60c4e8ed2974a70d6826b892",{      // this method takes two arguments(id,{parameters:value to update})
    age:42
}).then((user)=>{
    console.log(user)
    return User.Documentcount({age:42})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e);
})*/

const updateageandcount=async(id,age)=>{
const updateage=await User.findByIdAndUpdate(id,{age})
const number=await User.countDocuments({age});      // Documentcount({parameters})
return ({updateage,number})
}
updateageandcount("60c4e8ed2974a70d6826b892",10).then((result)=>{
    console.log(result);
}).catch((e)=>{
console.log(e);
})
