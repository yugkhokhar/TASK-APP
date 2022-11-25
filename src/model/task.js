const mongoose=require("mongoose");
const taskschema=new mongoose.Schema({
    TASK:{
        type:"String",
        required:true,
        minlength:10,
        default:null
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps:true
})
const tasks=mongoose.model("task-model",taskschema)
module.exports=tasks