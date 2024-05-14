const express = require("express");
const route = express.Router();
const { addAdmin, loginAdmin, authenticateAdmin, userAdd } = require("../Controller/usercontroller");
route.get('/user', (req, res) => {
    res.send("hello user i am here");
});

route.post('/addAdmin', addAdmin);
route.get('/loginAdmin' , loginAdmin);
route.post('/useradd' , authenticateAdmin,userAdd);

module.exports = route;
