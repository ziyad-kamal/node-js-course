const mongoose = require("mongoose");

const schema = mongoose.Schema;

const postSchema = new schema({
    title: String,
    content: String,
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
