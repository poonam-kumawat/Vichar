import express, { Request, Response, Router, response } from "express";
import * as bcrypt from "bcrypt";
import user from "../models/user";
import * as jwt from "jsonwebtoken";
import { CreateError } from "../utils/error";
import { CreateSuccess } from "../utils/success";
import { OAuth2Client } from "google-auth-library";
import mongoose from "mongoose";
const userRouter = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


userRouter
  .route("/register")
  .post(async (req: Request, res: Response, next: any) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const createuser = new user({
        email: req.body.email,
        name: req.body.name,
        password: hashPassword,
      });
      await createuser.save();
      // return res.status(200).send("user Register");
      return next(CreateSuccess(200, "User Register successfully"));
    } catch (e: any) {
      res.status(500).json({
        message: e || "Bad Request. Please Try Again",
      });
    }
  });

userRouter.route("/login").post(async (req: Request, res: Response) => {
  // res.redirect("http://localhost:4200/dashboard");
  try {
    const userLogin = await user.findOne({ email: req.body.email });
    if (!userLogin) {
      return res.status(404).send("User not Forund");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userLogin.password
    );
    if (!isPasswordCorrect)
      return res.status(400).send("Password is incorrect");
    const accessToken = jwt.sign(
      { email: req.body.email },
      process.env.ACCESS_SECRET as string,
      { expiresIn: "2d" }
    );
    const refreshToken = jwt.sign(
      { email: req.body.email },
      process.env.REFRESH_SECRET as string,
      {
        expiresIn: "20d",
      }
    );
    // return res.status(200).send("Login successfully");
    res
      .cookie("access_Token", accessToken, { httpOnly: true })
      .status(200)
      .json({
        status: 200,
        message: "Login Success",
        data: userLogin,
      });
  } catch (e: any) {
    res.status(500).json({
      message: e || "Bad Request. Please Try Again",
    });
  }
});

userRouter.route("/login/google").post(async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    if (!token) {
      return res.status(400).send("No token provided");
    }
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send("Invalid Google token");
    }
    const email = payload.email;
    let userLogin = await user.findOne({ email });

    if (!userLogin) {
      userLogin = new user({ email,
         name: payload.name || "Google User" });
      await userLogin.save();
    }
    const accessToken = jwt.sign(
      { email },
      process.env.ACCESS_SECRET as string,
      { expiresIn: "2d" }
    );

    const refreshToken = jwt.sign(
      { email },
      process.env.REFRESH_SECRET as string,
      { expiresIn: "20d" }
    );

    res
      .cookie("access_Token", accessToken, { httpOnly: true })
      .status(200)
      .json({
        status: 200,
        message: "Login Success",
        data: userLogin,
      });
  } catch (e: any) {
    res.status(500).json({
      message: e.message || "Bad Request. Please Try Again",
    });
  }
});
 

userRouter.route("/profile/:id").get(async (req: Request, res: Response) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const userProfile = await user.aggregate(
      [
        {
          $match: {
            _id: id,
          },
        },
        {
          $lookup: {
            from: "blogs",
            localField: "_id",
            foreignField: "creator",
            as: "blogsData",
          },
        },
        // { $unwind: { path: "$blogsData" } },
      ],
      
    );
    return res.status(200).json(userProfile);
    
  } catch (error:any) {
     return res.status(500).json({ error: error.message });
    
  }
  

})


export default userRouter;
