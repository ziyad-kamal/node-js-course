// src/routes/userRoutes.js
import express from "express";
import upload from "../middlewares/upload.js";
const router = express.Router();

import {
    getPosts,
    storePosts,
    createPost,
} from "../controllers/userController.js";
import { postValidator } from "../validators/postValidator.js";

router.get("/posts", getPosts);

router.get("/post/create", createPost);

router.post("/post/store", [upload.single("image"), postValidator], storePosts);

export default router;
