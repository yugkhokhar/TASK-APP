const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
setTimeout(()=>{
    if(a<0||b<0)
{
   return reject("ENTER AN NON-NEGATIVE NUMBER")
}
resolve(a+b)
},2000)
})
}

const sync=async()=>{
    const sum1=await add(10,-10)
    const sum2=await add(sum1,10)
    const sum3= await add(sum2,10)
    return sum3;
    
}

sync().then((result)=>{
console.log(result);
}).catch((e)=>{
console.log(e);
})