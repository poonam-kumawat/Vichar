import express, { Request, Response, Router, response } from "express";
import blog from "../models/blog";
import blogSchema from "../models/blog"


const blogRouter=express.Router();

blogRouter.route("/create").post(async(req:Request,res:Response)=>{
    try {
        const createBlog=new blog({
            title:req.body.title,
            type:req.body.type,
            description:req.body.description
        });
        const blogCreation = await blogSchema.create(createBlog)
        // await createBlog.save();
return res.status(200).json(blogCreation);        
    } catch (error:any) {
        return res.status(500).json({ success: false, message: error.message });
        
    }
})


export default blogRouter;