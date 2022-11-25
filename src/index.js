require('./db/mongoose.js')
const express = require('express')
const newrouter = require('./userouter.js')
const newrouter1 = require('./taskrouter.js')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const app = express()

app.listen(3000, () => {
  console.log('SERVER IS UP AT PORT 3000')
})

// MIDDLEWARE FUNCTION
/*
app.use((req,res,next)=>{
      res.status(503).send("THE SITE UNDER MAINTAINENCE");
})
*/

app.use(express.json())
app.use(newrouter)
app.use(newrouter1)

// HASHING OF PASSWORD

//const bcrypt=require("bcryptjs")

/*const myfunction=async()=>{
const password="S2k3c0s2@";
const hashedpassword=await bcrypt.hash(password,8);

const ismatch=await bcrypt.compare("s2k3c0s2@",hashedpassword);
if(ismatch)
{
return console.log("LOGIN SUCCESS");
}
console.log("CANNOT LOGIN")
}
myfunction();*/

// USING THE JSONWEBTOKEN
const token = () => {
  //sign takes three arguments ({the id of user},secretkey/signature,{expiresIn})
  const tokencreate = jwt.sign({ _id: 'abcd123' }, 'myfirsttoken', {
    expiresIn: '20 seconds',
  })
  console.log(tokencreate)
  const tokenverify = jwt.verify(tokencreate, 'myfirsttoken')
  console.log(tokenverify)
}
token()
