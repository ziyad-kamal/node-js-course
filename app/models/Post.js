import mongoose from "mongoose";

const schema = mongoose.Schema;

const postSchema = new schema({
    title: String,
    content: String,
    filePath: String,
});

const Post = mongoose.model("post", postSchema);

export default Post;
