import express from "express";
import { welcome } from "../app/controllers/loginController.js";
import {
    getPostsController,
    storePosts,
} from "../app/controllers/postController.js";
import { jwtVerify } from "../app/middlewares/jwtVerify.js";
import { uploadImage } from "../app/middlewares/upload.js";
import { verifyFileType } from "../app/middlewares/verifyFileType.js";
import { postValidator } from "../app/validators/postValidator.js";

const protectedRouter = express.Router();

protectedRouter.use("/post", jwtVerify);

protectedRouter.get("/post", getPostsController);

protectedRouter.post(
    "/post/store",
    [uploadImage.single("image"), verifyFileType, postValidator],
    storePosts,
);

protectedRouter.get("/welcome", welcome);

export default protectedRouter;
