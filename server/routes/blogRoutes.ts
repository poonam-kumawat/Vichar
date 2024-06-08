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

blogRouter.route("/blogs").get(async(req:Request,res:Response)=>{
    const result = await blogSchema.find({}).sort({ timeStamp: -1 });
    return res.status(200).json(result);
})

blogRouter.route("/:id").delete(async(req:Request,res:Response)=>{
    try {
        const id=req.params.id;
        if(!id){
            throw new Error("Id is required");
        }
        const data=await blogSchema.findByIdAndDelete(id);
        return res.status(200).json(data);
        
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
        
    }

})

blogRouter.route("/edit").put(async(req:Request,res:Response)=>{
    try {
        const filter=req.body;
        if(filter.id===undefined) throw new Error("Id is required!");
        const data=await blogSchema.findByIdAndUpdate(filter.id,filter,{
            upsert:false,
        });
        return res.status(200).json(data);        
    } catch (error:any) {
       return res.status(500).json({ error: error.message });
    }
})

blogRouter.route("/details").post(async(req:Request,res:Response)=>{
    try {
       const filter = req.body;
       const data=await blogSchema.find(filter);
       return res.status(200).send(data); 
    } catch (error:any) {
        
    }
})

export default blogRouter;