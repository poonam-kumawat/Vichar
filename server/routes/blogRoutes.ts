import express, { Request, Response, Router, response } from "express";
import blog from "../models/blog";
import blogSchema from "../models/blog"
import user from "../models/user";


const blogRouter=express.Router();

blogRouter.route("/create").post(async(req:Request,res:Response)=>{
    try {
        const createBlog=new blog({
            title:req.body.title,
            type:req.body.type,
            description:req.body.description,
            creator:req.body.creator,
        });
        const blogCreation = await blogSchema.create(createBlog)
        // await createBlog.save();
return res.status(200).json(blogCreation);        
    } catch (error:any) {
        return res.status(500).json({ success: false, message: error.message });
        
    }
})

// blogRouter.route("/blogs").get(async(req:Request,res:Response)=>{
//     const result = await blogSchema.find({}).sort({ timeStamp: -1 });
//     return res.status(200).json(result);
// })
blogRouter.route("/blogs").get(async (req: Request, res: Response) => {
  try {
    const blogs = await blog.aggregate([
      {
        $lookup: {
          from: "users", 
          localField: "creator",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", 
      },
      {
        $project: {
          title: 1,
          type: 1,
          description: 1,
          timeStamp: 1,
          "userDetails.email": 1,
          "userDetails.name": 1,
          "userDetails.timeStamp": 1,
        },
      },
    ]);

    res.status(200).json(blogs);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});

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

blogRouter.route("/blogs/:id").get(async(req:Request,res:Response)=>{})

export default blogRouter;