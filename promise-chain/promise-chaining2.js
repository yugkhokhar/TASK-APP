require("../src/db/mongoose.js");
const task=require("../src/model/task.js");
/*
task.findByIdAndDelete("60c4ff1eb0162214d0c179d6").then((tasks)=>{
    console.log(tasks);
    return task.countDocuments({completed:false})
}).then((count)=>{
console.log(count)
}).catch((error)=>{
    console.log(error)
})*/

const taskdelete=async(id,completed)=>{
await task.findByIdAndDelete(id);
 const count=await task.countDocuments({completed})
return count
}

taskdelete("60c4e433b3976835c0274a94",false).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})