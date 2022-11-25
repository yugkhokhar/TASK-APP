const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-managar-mongoose', {
  // mongoose connect model accepts two arguments the url[mongo:db//ip addresslocalhost:loca; port/database name] connection and options
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
})

// USED TO CREATE A MODEL IN  MONGOOSE

/*
const model1=mongoose.model("model1",{
    desciption:{
        type:String,
        required:true,
        trim:true


    },
    completed:{
        type:Boolean,
        default:false
    }
})


const newmodel=new model1({
    desciption:"I AM WORKING ON NODEJS     tuggnfnog   fyrtu   ",
    
})

newmodel.save().then(()=>{
    console.log(newmodel)
}).catch((error)=>{
    console.log(error)
})

*/
