const express = require("express");
const route = express.Router();
const { addAdmin, loginAdmin } = require("../Controller/usercontroller");
route.get('/user', (req, res) => {
    res.send("hello user i am here");
});

route.post('/addAdmin', addAdmin);
route.get('/loginAdmin' , loginAdmin);

module.exports = route;
