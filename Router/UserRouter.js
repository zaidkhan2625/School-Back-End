const express = require("express");
const route = express.Router();
route.get('/user',(req ,res)=>{
    res.send("hello user i am here");
})
module.exports = route;