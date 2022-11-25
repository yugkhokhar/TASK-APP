const mongoose=require("mongoose")
const bcyrpt=require("bcryptjs")
const validator=require("validator");
const Task=require("./task")
const sharp=require("sharp");
const jwt=require("jsonwebtoken");
const userschema=new mongoose.Schema({        // MONGOOSE MODEL ACCEPTS THE MODEL NAME AND THE PARAMETERS
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        validate(value)
        {
            if(value<0)
            {
                throw new Error("AGE NEEDS TO BE A POSITIVE NUMBER")
            }
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trime:true,
       lowercase:true,
        validate(value)
        {
          if(!validator.isEmail(value))
        {
          throw new Error("ENTER THE VALID EMAIL")
        }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value)
        {
            if(value.toLowerCase().includes("password"))
            {
                throw new Error("TRY ANOTHER PASSWORD")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required:true
       
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userschema.virtual("tasks",{
    ref:"task",
    localField:"_id",
    foreignField:"owner"
})


userschema.statics.findbycrediantials=async(email,password)=>
{
      const user=await User.findOne({email})
      if(!user)
      {
         throw new Error("ACCESS DENIED")
      }
const passwordcheck=await bcyrpt.compare(password,user.password)
if(!passwordcheck)
{
    throw new Error("ACCESS DENIED");
}
return user
}


userschema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'thisismynewcourse')

    user.tokens = user.tokens.concat({token});
    user.save()
    return token
}

userschema.methods.toJSON=function(){
const user=this;
const userobject=user.toObject();
delete userobject.password;
delete userobject.tokens;
delete userobject.avatar
return userobject;

}

userschema.pre("remove", async function(next){
const user=this;
await Task.deleteMany({owner:user._id});

    next()
})


userschema.pre("save",async function(next){
    const user=this
    if(user.isModified("password"))
    {
         user.password=await bcyrpt.hash(user.password,8);
    }
        next();
    })

const User=mongoose.model("User",userschema)
module.exports=User