import Post from "../models/Post.js";

const getAllPosts = (query, limit) => {
    return Post.find(query)
        .populate({
            path: "comments",
            populate: {
                path: "author",
                select: "username name imagePath",
            },
            perDocumentLimit: 5,
            select: "content author createdAt",
            options: { sort: { createdAt: -1 } },
        })
        .populate("commentsCount")
        .populate("author", "username name imagePath")
        .sort({ createdAt: -1 })
        .limit(limit + 1)
        .lean();
};

export { getAllPosts };
