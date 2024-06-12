import express, { Request, Response, Router, response } from "express";
import multer from "multer";

const quillRouter = express.Router();

const upload = multer({ dest: "uploads/" });
quillRouter
  .route("/upload")
  .post(upload.single("file"), async (req: Request, res: Response) => {
    try {
      const file = req.file;
      console.log(file);
      return res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        url: `http://localhost:5000/uploads/${file?.filename}`,
      });
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

export default quillRouter;
