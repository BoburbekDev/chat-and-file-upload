const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost:27017/smartstaff";
mongoose
  .connect(DB_URI, {
    // dbName: "hamroh",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB Connected"))
  .catch((err) => console.log(err));