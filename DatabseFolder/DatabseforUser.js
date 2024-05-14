const mongoose = require("mongoose");
const Admin = new mongoose.Schema({
  name: String,
  password: String,
  Email: { type: String, unique: true },
  role: { type: String, default: "admin" },
});
const Principal = new mongoose.Schema({
  name: String,
  password: String,
  Email: { type: String, unique: true },
  role: { type: String, default: "Principal" },
  Image: String,
});
const teacher = new mongoose.Schema({
  name: String,
  password: String,
  Email: { type: String, unique: true },
  role: { type: String, default: "teacher" },
});
const User = new mongoose.Schema({
    name: String,
    password: String,
    Email: { type: String, unique: true },
    role:{type:String , enum:["STUDENT" , "TEACHER", "PRINCIPAL","ADMIN"],default:"STUDENT"}
})
const Event = new mongoose.Schema({
  name: String,
  title: String,
  discreption: String,
  Image: new mongoose.Schema([
    {
      imgUrl:{ type: String, required: true }
    },
  ]),
});

const newStudent = mongoose.model("User", User);
const newAdmin = mongoose.model("Admin",Admin);
const newEvent = mongoose.model("Event", Event);
module.exports = { newStudent, newEvent ,newAdmin};
