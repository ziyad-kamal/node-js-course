import Post from "../models/Post.js";
import { returnSuccess } from "../utils/returnJson.js";
import uploadImage from "../utils/uploadImage.js";

const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.render("posts.ejs", { posts: posts });
};

const createPost = async (req, res) => {
    res.render("index.ejs");
};

const storePosts = async (req, res) => {
    const filePath = await uploadImage(req, "/public/images", 300);
    const { title, content } = req.body;

    const post = await Post.create({ title, content, filePath });

    return returnSuccess(res, "you created post successfully", 201, post);
};

export { getPosts, storePosts, createPost };
