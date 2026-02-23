import Post from "../models/Posts.js";
import sharp from "sharp";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.render("posts.ejs", { posts: posts });
};

const createPost = async (req, res) => {
    res.render("index.ejs");
};

const storePosts = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Generate a random filename (never use original name)
    const filename = `${crypto.randomBytes(16).toString("hex")}.webp`;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const uploadDir = path.join(__dirname, "../public/images");
    const filepath = path.join(uploadDir, filename);

    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process with sharp — strips metadata , re-encodes, validates it's a real image
    await sharp(req.file.buffer)
        .resize(1920, 1080, { fit: "inside", withoutEnlargement: true }) // limit dimensions
        .webp({ quality: 85 })
        .toFile(filepath);

    const newPost = new Post();
    const { title, content } = req.body;

    newPost.title = title;
    newPost.content = content;
    newPost.file = filename;

    await newPost.save();

    res.redirect("/users/post/create");
};

export { getPosts, storePosts, createPost };
