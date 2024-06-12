import express from "express";
import dotenv from "dotenv";
import { connectToMongo } from "./conn";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";
import cookieParser from "cookie-parser";
import path from "path";

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
app.use(express.static("public"));
app.use(cors(options));
app.use(express.json());
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);


//Response  handleer

app.use((obj: any, req: any, res: any, next: any) => {
  const statusCode = obj.status || 500;
  const message = obj.message || "Something went wrong";
  return res.status(statusCode).json({
    success: [200,201,204].some(a=>a=== obj.status)?true:false,
    status: statusCode,
    message: message,
    data:obj.data,
  });
});




app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
