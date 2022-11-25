// MONGOCLIENT IS USED TO CONNECT THE  NODE TO MONGODB
const {MongoClient,ObjectID, Db}=require("mongodb");


const urlconnection="mongodb://127.0.0.1:27017";
const databasename="task-manager";
const id=new ObjectID();
console.log(id);
console.log(id.getTimestamp());   // gettimestamp() function is used to provide the time at which the id was created
MongoClient.connect(urlconnection,{useUnifiedTopology: true},(error,client)=>{
    if(error)
    {
        return console.log("UNABLE TO CONNECT");
    }
    
const db=client.db(databasename);

// USED TO INSET SINGLE DATA
db.collection("users").insertOne({
   _id:id,
    name:"papa",
    age:43
},(error,result)=>{
    if(error)
    {
        return console.log("UNABLE TO INSERT")
    }
    console.log(result.ops);
})


// USED TO INSERT MANY DATA
db.collection("users").insertMany([{
  name:"aagna",
  age:16
},{
    name:"MOM",
    age:42
}],(error,result)=>{
    if(error)
    {
        return console.log("UNABLE TO INSERT");
    }
    console.log(result.ops);
})
db.collection("tasks").insertMany([{

    description:" HELLO HOW ARE YOU",
    completed:1
},{
    
    description:" I AM FINE",
    completed:0
},{
    
    description:" WHAT YOU DO FOR LIVING",
    completed:1
}],(error,result)=>{
 if(error)
 {
    return console.log("UNABLE TO INSERT");
 }
   console.log(result.ops);
})



// USED TO FIND OR READ THE DATA
db.collection("tasks").findOne({
    _id:new ObjectID("60c2dc4731c7703550d8c47a")}
    ,(error,user)=>{
    console.log(user)
})

db.collection("tasks").find({completed:1}).toArray((error,user)=>{
    console.log(user)
})


// USED TO UPDATE ONE DATA
db.collection("users").updateOne(
    {
      _id: new ObjectID("60c2d953f96c2a2ccc3def17")        // USED TO TELL THE UPDATE ITEM
    },
{
    $inc:
    {
        age:10
    },
    $set:{
        name:"khokhar"
    }
}
).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})



// used to update more than one data  SYNTAX(filter(parameters to update),throughwhich method to update,option,promise)
db.collection("tasks").updateMany(
    {
     completed:0
              
    },
{
    $set:
    {
        completed:1
    }
}
).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})


// DELETE THE DATA FROM DATABASE      SYNTAX(filter(data to delete),option,promise)
db.collection("tasks").deleteOne({
    _id: new ObjectID("60c2dc4731c7703550d8c479")
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})





//USE TO DELETE MULTIPLE DATA      SYNTAX(filter(data to delete),option,promise)
db.collection("users").deleteMany({
    age:16
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})



db.collection("users").updateMany(
    {
     name:"papa"
              
    },
{
    $set:
    {
        age:42
    }
}
).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})



})


// PROMISE IS USED INSTEAD OF CALLBACK FUNCTION
const promises=new Promise((resolve,reject)=>{
setTimeout(()=>{
    resolve([2,3,4]);
reject("NOT ABLE TO GET IT");
},2000)

})


promises.then((result)=>{
console.log(result);
}).catch((error)=>{
    console.log(error)
})














