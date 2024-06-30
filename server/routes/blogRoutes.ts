import express, { Request, Response, Router, response } from "express";
import blog from "../models/blog";
import blogSchema from "../models/blog";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const blogRouter = express.Router();

blogRouter.route("/create").post(async (req: Request, res: Response) => {
  try {
    const createBlog = new blog({
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      creator: req.body.creator,
      images: req.body.images,
    });
    const blogCreation = await blogSchema.create(createBlog);
    return res.status(200).json(blogCreation);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
const storage = multer.memoryStorage();
const upload = multer({ storage });
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKITPUBLICKEY!,
  privateKey: process.env.IMAGEKITPRIVATEKEY!,
  urlEndpoint: process.env.IMAGEKITURLPOINT!,
});
blogRouter
  .route("/upload")
  .post(upload.single("file"), async (req: Request, res: Response) => {
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
      console.error("Error uploading image:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

  blogRouter.route("/blogs").post(async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.body;
      const skip = (page - 1) * limit;
      const totalCount = await blog.countDocuments();

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
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]);

      res.status(200).json({blogs, totalCount});
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });


//   try {
//     const blogs = await blog.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "creator",
//           foreignField: "_id",
//           as: "userDetails",
//         },
//       },
//       {
//         $unwind: "$userDetails",
//       },
//     ]);

//     res.status(200).json(blogs);
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// });

blogRouter.route("/:id").delete(async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id is required");
    }

    const data = await blogSchema.findByIdAndDelete(id);
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

blogRouter.route("/edit").put(async (req: Request, res: Response) => {
  try {
    const filter = req.body;
    if (filter.id === undefined) throw new Error("Id is required!");
    const data = await blogSchema.findByIdAndUpdate(filter.id, filter, {
      upsert: false,
    });
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

blogRouter.route("/details").post(async (req: Request, res: Response) => {
  try {
    const filter = req.body;
    // const data = await blogSchema.find(filter);
    const data = await blogSchema
      .find(filter)
      .populate("creator", "name profilePicture timeStamp");

    return res.status(200).send(data);
  } catch (error: any) {}
});


export default blogRouter;
