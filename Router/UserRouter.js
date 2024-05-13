const express = require("express");
const route = express.Router();
// const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const bcrypt = require("bcryptjs");
const {newAdmin} = require("../DatabseFolder/DatabseforUser");
route.get('/user', (req, res) => {
    res.send("hello user i am here");
});

route.post('/addAdmin', async (req, res) => {
    const { name, Email, password } = req.body;
    try {
        const userExists = await newAdmin.findOne({ Email }); // Assuming newUser is a Mongoose model
        if (userExists) {
            res.send("Email already exists");
        } else if (name && Email && password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await newAdmin.create({ name, Email, password: password, role: 'admin' }); // Assuming 'role' is defined
            res.send("Admin added successfully");
        } else {
            res.send("Incomplete data provided");
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = route;
