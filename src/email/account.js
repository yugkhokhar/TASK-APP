const sendgrid=require("@sendgrid/mail");
const apikey=""
sendgrid.setApiKey(apikey)

const sendwelcome=(email,name)=>{
    sendgrid.send({
    to:email,
    from:"yugkhokhar18@gmail.com",
    subject:"WELCOME TO OUR APPLICATION",
    text:`HI ${name},HOPE  YOU WILL FIND OUR APPLICATION INTRESTING`
})
}


const deleteaccount=(email,name)=>{

sendgrid.send({
    to:email,
    from:"yugkhokhar18@gmail.com",
    subject:"CANCELLATION OF YOUR ACCOUNT",
    text:`SORRY ${name}! YOU HAVE TO DELETE YOUR ACOOUNT CAN YOU PLEASE ACKNOWLEDGE US WHAT WENT WRONG WITH OUR APPLICATION. WE WOULD TRY TO FIX YOUR PROBLEM `
})



}
module.exports={
    sendwelcome,deleteaccount
}
