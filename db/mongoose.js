const mongoose = require("mongoose");

const connectionURL = process.env.MONGO_URL;

mongoose.connect(connectionURL, (err) => {
  if (err) throw err;

  console.log("connect to db");
});
