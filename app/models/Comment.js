import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Comment cannot be empty"],
            trim: true,
            maxlength: [500, "Comment cannot exceed 500 characters"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        // Optional: support replies (nested comments)
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
    },
    {
        timestamps: true,
        // toJSON: { virtuals: true },
        // toObject: { virtuals: true },
    },
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
