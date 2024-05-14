const express = require("express");
const connectDb = require("./Database/db");
const app = express();
const router = require("./Router/UserRouter");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(express.json());

app.use(bodyParser.json());
app.use(cookieparser());
app.get('/',(req , res)=>{
  res.send("hello");
})
app.use('/school/v1',router);
connectDb().then(() => {
    // Start server
    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });


