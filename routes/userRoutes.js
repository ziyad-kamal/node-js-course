import express from "express";
import upload from "../app/middlewares/upload.js";
import {
    getPosts,
    storePosts,
    createPost,
} from "../app/controllers/userController.js";
import { postValidator } from "../app/validators/postValidator.js";
import { verifyFileType } from "../app/middlewares/verifyFileType.js";
import { login, welcome } from "../app/controllers/loginController.js";
import { jwtVerify } from "../app/middlewares/jwtVerify.js";

const router = express.Router();

router.get("/posts", getPosts);

router.get("/post/create", createPost);

router.post(
    "/post/store",
    [upload.single("image"), verifyFileType, postValidator],
    storePosts,
);

router.post("/login", login);

router.get("/welcome", jwtVerify, welcome);

export default router;
