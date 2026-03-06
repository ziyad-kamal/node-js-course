import Post from "../models/Post.js";
import { returnSuccess } from "../utils/returnJson.js";
import uploadImage from "../utils/uploadImage.js";
import { getNextCursor, getQueryCursor } from "../utils/cursorPagination.js";

const getPosts = async (req, res) => {
    const limit = 10;
    const { query, sortField } = getQueryCursor(req, "createdAt");

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

    // prettier-ignore
    const { hasMore, nextCursor, results } = getNextCursor(posts,limit,sortField);

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
