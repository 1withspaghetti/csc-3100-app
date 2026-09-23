import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config"
import userService from "./services/user-service.ts"

const { MONGO_CONNECTION_STRING } = process.env;
if (!MONGO_CONNECTION_STRING) throw new Error("Please define MONGO_CONNECTION_STRING");

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING, { dbName: "users" })
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/user", userService)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});