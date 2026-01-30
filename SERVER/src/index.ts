import cors from "cors";
import express, { Application, Request, Response } from "express";
import { configDotenv } from "dotenv";
import connectToMongoDB from "./mongodb";
import { userRouter } from "./routers";
import { foodRouter } from "./routers";
import { foodOrderRouter } from "./routers";

configDotenv();

const app: Application = express();

const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/food", foodRouter);
app.use("/food-orders", foodOrderRouter);

app.listen(port, () => {
  connectToMongoDB();
  console.log("http://localhost:8000");
});
