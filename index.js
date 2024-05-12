const express = require("express");
const connectDb = require("./Database/db");
const app = express();
const router = require("./Router/UserRouter");
app.use('/school/v1',router);
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


