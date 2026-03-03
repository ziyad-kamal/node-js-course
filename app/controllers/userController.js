import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import { returnSuccess } from "../utils/returnJson.js";
import uploadImage from "../utils/uploadImage.js";

const getPosts = async (req, res) => {
    const cursor = req.query.cursor;
    const sortField = "createdAt";
    const query = {};
    const limit = 10;

    if (cursor) {
        query[sortField] = { $lt: new Date(cursor) };
    }

    const posts = await Post.find(query)
        .populate({
            path: "comments",
            populate: {
                path: "author",
                select: "username name imagePath",
            },
            select: "content author createdAt",
            options: { sort: { createdAt: -1 }, limit: 5 },
        })
        .populate("author", "username name imagePath")
        .sort({ createdAt: -1 })
        .limit(limit + 1)
        .lean();

    const hasMore = posts.length > limit;
    const results = hasMore ? posts.slice(0, limit) : posts;

    const nextCursor =
        hasMore && results.length > 0
            ? results[results.length - 1][sortField].toISOString() // or .toString() for _id
            : null;
    const data = { metaData: { hasMore, nextCursor }, posts: results };

    return returnSuccess(res, "", 200, data);
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
