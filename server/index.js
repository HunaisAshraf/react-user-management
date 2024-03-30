const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoute");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.listen(3000, () => console.log("server running in port 3000"));
