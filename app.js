const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const messageRoutes = require("./Routes/Message-routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

const MongoUri =
  "mongodb+srv://tasduqali:aiislove99%24@aidataron-nwmdk.mongodb.net/aidataron?retryWrites=true&w=majority";
mongoose.connect(MongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.error("error connecting mongoose", err);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requseted-With, Content-Type, Accept , Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

  next();
});

app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
