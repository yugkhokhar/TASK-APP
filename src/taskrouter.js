
const express=require("express");
const app=new express.Router();
const auth=require("./middleware/auth.js");
const task=require("./model/task.js");


app.post("/createtask",auth,async(req,res)=>{
    const task_add=new task({
        ...req.body,
        owner:req.user._id
    })
    try{
       task_add.save()
      res.status(201).send(task_add)
    }
  catch(error)
  {
  res.status(400).send(error);
  }
  })
  

  
  app.get("/task/:id",auth,async(req,res)=>{
  
      const _id=req.params.id;
      try{
    const tasks=await task.findOne({_id,owner:req.user._id})
      if(!tasks)
      {
          return res.status(404).send("NOT ABLE TO FOUND")
      }   
      res.send(tasks)

     }
    catch(error){
         res.status(400).send(error)
     }
  })
  

  
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc

  app.get("/readtasks",auth,async(req,res)=>{
const match={};
const sort={};
if(req.query.completed)
 {
    match.completed=req.query.completed==="true"
 }
if(req.query.sortBy)
{
    const parts=req.qury.sortBy.split(":")
    sort[parts[0]]=parts[1]==="desc"?-1:1
}

    try
    {
        await req.user.populate({
            paths:"tasks",
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
       res.send(req.user.tasks);
     }
     catch(error){
          res.status(400).send(error)
     }
 
})

  
  
  
  
  
  
  
  
  app.patch("/taskupdate/:id",auth,async(req,res)=>{
  
  const _id=req.params.id;
  const updatebyusertask=Object.keys(req.body);
  const allowedupdates=["TASK","completed"]
  const validupdate=updatebyusertask.every((individual)=>allowedupdates.includes(individual))
  if(!validupdate)
  {
      return res.status(400).send({
          error:"INVALID TASK UPDATE"
      })
  }
  try
  {
      const updatetask=await task.findByIdAndUpdate({_id,owner:req.user._id},req.body,{new:true})
      if(!updatetask)
      {
         return  res.status(404)
      }
     res.send(updatetask);
  }
  catch(e)
  {
      res.status(401).send(e);
  }
  })
  
  
  
  
  app.delete("/taskdelete/:id",auth,async(req,res)=>{
      const _id=req.params.id;
      try{
          const deletetask=await task.findByIdAndDelete({_id,owner:req.user._id})
          if(!deletetask)
          {
              return res.status(404).send({error:"NOT A VALID DELETE"})
          }    
          res.send(deletetask)
      }
      catch(error){
          res.status(500).send();
      }
      })
  

module.exports=app