import mongoose from "mongoose";
import "../models/Comment.js";
import "../models/User.js";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Post title is required"],
            trim: true,
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        content: {
            type: String,
            required: [true, "Post content is required"],
            trim: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            type: String,
        },
        tags: {
            type: [String],
            default: [],
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        likeCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);

postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
});

postSchema.virtual("commentsCount", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
    count: true,
});

postSchema.index({ title: "text", content: "text" });
postSchema.index({ createdAt: -1 });

const Post = mongoose.model("Post", postSchema);

export default Post;
