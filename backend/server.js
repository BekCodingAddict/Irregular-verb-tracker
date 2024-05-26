const express = require("express");
const cors = require("cors");
const MongoDBConfig = require("./config/MongoDBConfig");
const userRoute = require("./routes/usersRoute");
require("dotenv").config();

//use
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`Server listeing on port ${PORT}!`));
