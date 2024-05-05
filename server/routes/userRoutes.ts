import express, { Request, Response, Router, response } from "express";
import * as bcrypt from "bcrypt";
import user from "../models/user";
import * as jwt from "jsonwebtoken";
import { CreateError } from "../utils/error";
import { CreateSuccess } from "../utils/success";
const userRouter = express.Router();

userRouter.route("/register").post(async (req:Request,res:Response,next:any)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(req.body.password,salt);
        const createuser = new user({
          email: req.body.email,
          name: req.body.name,
          password: hashPassword,
        });
        await createuser.save();
        // return res.status(200).send("user Register");
        return next(CreateSuccess(200,"User Register successfully"));

    }catch(e:any){
        res.status(500).json({
          message: e || "Bad Request. Please Try Again",
        });

    }
})


userRouter.route("/login").post(async (req:Request,res:Response)=>{
   try {
    const userLogin=await user.findOne({email:req.body.email});
    if(!userLogin){
        return res.status(404).send("User not Forund");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userLogin.password
    );
    if(!isPasswordCorrect) return res.status(400).send("Password is incorrect");
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
    res.cookie("access_Token",accessToken,{httpOnly:true}).status(200).json({
        status:200,
        message:"Login Success",
        data:userLogin
    })
   } catch (e:any) {
     res.status(500).json({
       message: e || "Bad Request. Please Try Again",
     });
    
   }
})

export default userRouter;