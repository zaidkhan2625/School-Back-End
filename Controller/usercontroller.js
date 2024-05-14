const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { newAdmin, newStudent } = require("../DatabseFolder/DatabseforUser");
const addAdmin = async (req, res) => {
  const { name, Email, password } = req.body;
  try {
    const userExists = await newAdmin.findOne({ Email }); // Assuming newUser is a Mongoose model
    if (userExists) {
      res.send("Email already exists");
    } else if (name && Email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await newAdmin.create({ name, Email, password: password, role: "admin" }); // Assuming 'role' is defined
      res.send("Admin added successfully");
    } else {
      res.send("Incomplete data provided");
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const loginAdmin = async (req, res) => {
  const { Email, password } = req.body;
  try {
    const user = await newAdmin.findOne({ Email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign(
      { userId: user._id, email: user.Email },
      "your_secret_key",
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true });
    res.json({ status: "Login successful", token: token, data: user });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "your_secret_key");

    if (!decoded) {
      return res
        .status(403)
        .json({ message: "Unauthorized - Admin role required" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
const userAdd = async(req , res)=>{
    const {name,password,Email}=req.body;
    try {
        const userExists = await newStudent.findOne({ Email }); // Assuming newUser is a Mongoose model
        if (userExists) {
          res.send("Email already exists");
        } else if (name && Email && password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          await newStudent.create({ name, Email, password: hashedPassword }); // Assuming 'role' is defined
          res.send("Admin added successfully");
        } else {
          res.send("Incomplete data provided");
        }
      } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
      }
    
}
module.exports = { addAdmin, loginAdmin, authenticateAdmin,userAdd };
