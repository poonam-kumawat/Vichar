import express, { Request, Response, Router, response } from "express";
import blog from "../models/blog";
import blogSchema from "../models/blog"
import user from "../models/user";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import ImageKit from "imagekit";


const blogRouter=express.Router();

blogRouter.route("/create").post(async(req:Request,res:Response)=>{
    try {
        const createBlog = new blog({
          title: req.body.title,
          type: req.body.type,
          description: req.body.description,
          creator: req.body.creator,
          images: req.body.images,
        });
        const blogCreation = await blogSchema.create(createBlog)
        // await createBlog.save();
return res.status(200).json(blogCreation);        
    } catch (error:any) {
        return res.status(500).json({ success: false, message: error.message });
        
    }
})
const storage = multer.memoryStorage();
const upload = multer({storage});
const imagekit = new ImageKit({
  publicKey: "public_c9LXwuMN+0zHnqJvDIwkSpASO0U=",
  privateKey: "private_N9/+vdDzpkAof5MhcFDi6/8scMU=",
  urlEndpoint: "https://ik.imagekit.io/poonam05/",
});
blogRouter.route("/upload").post(upload.single('file'),async (req: Request, res: Response) => {
  try {
 const file = req.file;
if (!file) {
  return res.status(400).send("No file uploaded");
}
const uploadResponse = await imagekit.upload({
  file: file.buffer,
  fileName: `${uuidv4()}${path.extname(file.originalname)}`,
  folder: "/blog-images",
});
    return res.status(200).json({ url: uploadResponse.url });
  } catch (error) {
    // Handle errors
    console.error("Error uploading image:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

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