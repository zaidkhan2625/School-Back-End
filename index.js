const express = require("express");
const connectDb = require("./Database/db");
const app = express();
app.get('/',(req , res)=>{
    res.send("hello i am live once again ");
})
connectDb().then(() => {
    // Start server
    const port = process.env.PORT || 2001;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });


