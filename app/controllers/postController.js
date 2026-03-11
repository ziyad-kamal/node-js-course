import { getPosts } from "../services/postService.js";
import { returnSuccess } from "../utils/returnJson.js";
import uploadImage from "../utils/uploadImage.js";
import Post from "./../models/Post.js";

const getPostsController = async (req, res) => {
    const data = await getPosts(req);

    return returnSuccess(res, "", 200, data);
};

const createPost = async (req, res) => {
    res.render("index.ejs");
};

const storePosts = async (req, res) => {
    const filePath = await uploadImage(req, "public/images", 300);
    const { title, content, author } = req.body;

    const post = await Post.create({ title, content, filePath, author });

    return returnSuccess(res, "you created post successfully", 201, post);
};

export { createPost, getPostsController, storePosts };
