import cors from "cors";
import express, { Application, Request, Response } from "express";
import { configDotenv } from "dotenv";
import connectToMongoDB from "./mongodb";
import { userRouter } from "./routers";
import { foodRouter } from "./routers";
import { foodOrderRouter } from "./routers";

configDotenv();

const app: Application = express();

const port = 10000;

app.use(cors());
app.use(express.json());

app.use("/authentication", userRouter);
app.use("/food", foodRouter);
app.use("/FoodOrder", foodOrderRouter);
app.use("/category");

connectToMongoDB();
app.listen(port, () => {
  console.log("http://localhost:10000");
});
