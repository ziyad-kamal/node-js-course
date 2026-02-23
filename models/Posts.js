import mongoose from "mongoose";

const schema = mongoose.Schema;

const postSchema = new schema({
    title: String,
    content: String,
    file: String,
});

const Post = mongoose.model("post", postSchema);

export default Post;
