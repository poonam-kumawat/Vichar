import express from "express";
import dotenv from "dotenv";
import { connectToMongo } from "./conn";
import cors from "cors";

dotenv.config();

const app = express();
const port = 5000;
connectToMongo();
const allowedOrigins = [
  "http://localhost:4200",
 
];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
