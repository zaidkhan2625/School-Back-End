const express = require("express");
const app = express();
app.get('/',(req , res)=>{
    res.send("hello i am live ");
})
app.listen(5000 , ()=>{
console.log("app is listinig");
})

