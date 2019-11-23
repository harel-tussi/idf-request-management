require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//setting middlewares
app.use(require("cors")());
app.use(require("body-parser").json());
app.use("/soldier", require("./routes/soldier"));
app.use("/commander", require("./routes/commander"));
app.use("/request", require("./routes/request"));
app.use("/auth", require("./routes/auth"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("mongoDB connected");
    app.listen(4000, () =>
      console.log("Server ready at http://localhost:4000")
    );
  })
  .catch(e => {
    console.log(e);
  });
